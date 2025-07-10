export const fideicomisoBase = {
  id_transaccion: "", // UUID o identificador único
  comprador_pi: "",   // username Pi del comprador (@piuser)
  vendedor_pi: "",    // username Pi del vendedor (@piuser)
  monto_pi: 0.0,      // valor exacto en Pi (tipo numeric)
  estado: "pendiente", // text: 'pendiente', 'validando', 'liberado', etc.
  confirma_envio: false, // vendedor confirma envío
  confirma_recepcion: false, // comprador confirma recepción
  fecha_pago: null,         // timestamp ISO cuando se inicia el fideicomiso
  fecha_envio: null,        // timestamp cuando se marca como enviado
  fecha_recepcion: null,    // timestamp cuando se marca como recibido
  liberado_por_ai: false,   // AIGen autorizó el desbloqueo
  validado_por_aigen: null, // 'liberado', 'en_disputa', 'rechazado'...
  historial: [
    // eventos importantes con timestamps
    { evento: "pago_iniciado", timestamp: "" },
    { evento: "fideicomiso_activo", timestamp: "" }
  ]
};
