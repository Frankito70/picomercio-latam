import { useEffect, useState } from 'react';

export default function Home() {
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    if (window?.Pi && window.Pi.authenticate) {
      window.Pi.authenticate(['username', 'payment'], function (authData) {
        setPiUser(authData.user);
      }, function (err) {
        console.error('Pi Login error:', err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Bienvenido a PiComercio LATAM</h1>
      <p className="text-gray-700 mb-6">
        La plataforma de comercio digital donde puedes vender y comprar usando Pi Coin.
      </p>

      {!piUser ? (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
          onClick={() => window?.Pi?.openLogin?.()}
        >
          Iniciar sesión con Pi
        </button>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <p className="text-gray-800">👋 Hola, <strong>{piUser.username}</strong></p>
          <p className="text-green-600 mt-2">¡Ya estás autenticado con Pi Network!</p>
        </div>
      )}
    </div>
  );
}

