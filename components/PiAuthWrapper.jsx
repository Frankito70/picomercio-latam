import { useEffect, useState } from "react";

export default function PiAuthWrapper({ children }) {
  const [piUser, setPiUser] = useState(null);
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const dentroDePi = userAgent.includes("PiBrowser");

    setIsPiBrowser(dentroDePi);

    if (!dentroDePi) {
      setError("Esta app solo puede usarse dentro de Pi Browser.");
      return;
    }

    if (window?.PiNetwork) {
      window.PiNetwork.authenticate(["username"], function (auth) {
        if (auth?.user) {
          setPiUser(auth.user);
        } else {
          setError("No se pudo autenticar con Pi Network.");
        }
      });
    } else {
      setError("No se detectó el SDK de Pi Network.");
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "tomato" }}>
        <h2>⚠️ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!piUser) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🔐 Autenticando con Pi Network...</h2>
      </div>
    );
  }

  return (
    <>
      {/* Puedes acceder a piUser.username aquí si lo necesitas */}
      {children}
    </>
  );
}
