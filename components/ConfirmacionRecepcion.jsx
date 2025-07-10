import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { validarFideicomiso } from "@/lib/validarFideicomisoAIGen"; // si ya lo creaste

export default function ConfirmacionRecepcion({ transaccionId }) {
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState("");

  const confirmarRecepcion = async () => {
    const fechaRecepcion = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("fideicomisos")
      .update({
        confirma_recepcion: true,
        fecha_recepcion: fechaRecepcion,
        historial: supabase.raw(
          `array_append(historial, jsonb_build_object('evento', 'recepcion_confirmada', 'timestamp', '${fechaRecepcion}'))`
        )
      })
      .eq("id_transaccion", transaccionId);

    if (updateError) {
      setError("❌ Error al confirmar recepción: " + updateError.message);
      return;
    }

    setConfirmado(true);
    await validarFideicomiso(transaccionId);
  };

  if (confirmado) {
    return (
      <p style={{ color: "green", marginTop: "1rem" }}>
        ✅ Recepción confirmada. AIGen procesará la validación.
      </p>
    );
  }

  return (
    <button
      onClick={confirmarRecepcion}
      style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: "#2378A6",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "1rem"
      }}
    >
      Confirmar que fue recibido 📥
    </button>
  );
}
