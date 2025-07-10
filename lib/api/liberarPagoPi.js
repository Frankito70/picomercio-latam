/**
 * Envía Pi al vendedor usando createPayment del SDK
 * @param {string} usernameDestino - Username Pi del vendedor (@usuario)
 * @param {number} montoPi - Cantidad a enviar
 * @param {string} transaccionId - ID de la transacción fiduciaria
 */
export async function liberarPagoPi(usernameDestino, montoPi, transaccionId) {
  if (!window?.PiNetwork || !usernameDestino || !montoPi) {
    console.error("❌ SDK no disponible o datos faltantes.");
    return;
  }

  window.PiNetwork.createPayment(
    {
      amount: montoPi.toString(),
      memo: `Pago liberado por LATAM PiComercio`,
      metadata: {
        tipo: "liberacion_fideicomiso",
        transaccion_id: transaccionId,
        receptor: usernameDestino
      }
    },
    function (paymentResult) {
      if (paymentResult && paymentResult.txid) {
        console.log("✅ Pago Pi realizado:", paymentResult.txid);
      } else {
        console.error("❌ Error en la liberación del pago Pi:", paymentResult);
      }
    }
  );
}
