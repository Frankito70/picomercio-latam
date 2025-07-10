import { useEffect, useState } from "react";

export default function WalletCheckBanner() {
  const [walletOk, setWalletOk] = useState(false);
  const [isPiBrowser, setIsPiBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const dentroDePi = userAgent.includes("PiBrowser");
    setIsPiBrowser(dentroDePi);

    if (dentroDePi && window?.PiNetwork) {
      window.PiNetwork.authenticate(["username"], function (auth) {
        if (auth?.user?.username) {
          setWalletOk(true);
        }
      });
    }
  }, []);

  if (!isPiBrowser || walletOk) return null;

  return (
    <div style={{
      padding: "1rem",
      backgroundColor: "#FFE8E8",
      color: "#8B0000",
      borderRadius: "8px",
      marginBottom: "1rem",
      textAlign: "center",
    }}>
      ⚠️ Para continuar, necesitas tener tu wallet Pi activa y vinculada.  
      Ve a <strong>wallet.pi</strong> en la app Pi Browser si aún no la has creado.
    </div>
  );
}
