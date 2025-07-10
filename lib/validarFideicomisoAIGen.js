import { supabase } from "./supabaseClient";
import { liberarPagoPi } from "./api/liberarPagoPi"; // función que genera el pago

export async function validarFideicomiso(transaccionId) {
  // Obtener datos actuales
  const { data: tx, error } = await supabase
    .from("fideicomisos")
    .select("*")
    .eq("id_transaccion", transaccionId)
    .single();

  if (error || !tx) {
    console.error("❌ Error obteniendo transacción:", error?.message);
    return;
  }

  const envio = tx.confirma_envio;
  const recepcion = tx.confirma_recepcion;

  // 🧠 Caso 1: Ambas partes confirmaron → liberar pago
  if (envio && recepcion && !tx.liberado_por_ai) {
    await liberarPagoPi(tx.vendedor_pi, tx.monto_pi, transaccionId);
    await supabase
      .from("fideicomisos")
      .update({
        estado: "liberado",
        liberado_por_ai: true,
        validado_por_aigen: "liberado"
      })
      .eq("id_transaccion", transaccionId);

    console.log("✅ Pago liberado por AIGen.");
    return;
  }

  // 🧠 Caso 2: Envío sin recepción después de X días → marcar en disputa
  const diasMaximos = 5;
  const fechaEnvio = new Date(tx.fecha_envio);
  const hoy = new Date();
  const diffDias = Math.floor((hoy - fechaEnvio) / (1000 * 60 * 60 * 24));

  if (envio && !recepcion && diffDias >= diasMaximos) {
    await supabase
      .from("fideicomisos")
      .update({
        estado: "en_disputa",
        validado_por_aigen: "en_disputa"
      })
      .eq("id_transaccion", transaccionId);

    console.warn("⚠️ Transacción marcada en disputa por AIGen.");
    return;
  }

  console.log("⏳ Aún esperando confirmación. No se libera nada.");
}
