import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { validarFideicomiso } from "@/lib/validarFideicomisoAIGen"; // si ya lo creaste

export default function ConfirmacionEnvio({ transaccionId }) {
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState("");

  const confirmarEnvio = async () => {
    const fechaEnvio = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("fideicomisos")
      .update({
        confirma_envio: true,
        fecha_envio: fechaEnvio,
        historial: supabase.raw(
          `array_append(historial, jsonb_build_object('evento', 'envio_confirmado', 'timestamp', '${fechaEnvio}'))`
        )
      })
      .eq("id_transaccion", transaccionId);

    if (updateError) {
      setError("❌ Error al confirmar envío: " + updateError.message);
      return;
    }

    setConfirmado(true);

    // Activar validación fiduciaria (IA)
    await validarFideicomiso(transaccionId);
  };

  if (confirmado) {
    return (
      <p style={{ color: "green", marginTop: "1rem" }}>
        ✅ Envío confirmado. AIGen validará la transacción.
      </p>
    );
  }

  return (
    <button
      onClick={confirmarEnvio}
      style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: "#268D5D",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "1rem"
      }}
    >
      Confirmar que fue enviado 📤
    </button>
  );
}
