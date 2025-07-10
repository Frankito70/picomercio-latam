import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export async function getServerSideProps({ params }) {
  const { id } = params;

  const { data: tienda, error } = await supabase
    .from("tiendas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !tienda) {
    return { notFound: true };
  }

  return { props: { tienda } };
}

export default function GestionarTienda({ tienda }) {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [userId, setUserId] = useState(null);

  // 📌 Obtener el ID del usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || !["image/png", "image/jpeg"].includes(file.type)) {
      alert("Selecciona una imagen JPG o PNG válida");
      return;
    }

    setLogoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const subirLogo = async () => {
    if (!logoFile) {
      alert("No se ha seleccionado ninguna imagen");
      return;
    }

    if (!userId) {
      alert("⚠️ No se detectó usuario autenticado. Debes iniciar sesión para subir tu logo.");
      return;
    }

    setSubiendo(true);
    const extension = logoFile.name.split(".").pop();
    const nombreArchivo = `${userId}/logo-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("tiendas-logos")
      .upload(nombreArchivo, logoFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: logoFile.type,
      });

    if (uploadError) {
      setSubiendo(false);
      alert("❌ Error al subir logo: " + uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("tiendas-logos")
      .getPublicUrl(nombreArchivo);

    const { error: updateError } = await supabase
      .from("tiendas")
      .update({ logo: urlData.publicUrl }, { returning: "minimal" })
      .eq("id", tienda.id);

    setSubiendo(false);

    if (updateError) {
      alert("❌ Error al guardar en la base de datos: " + updateError.message);
      return;
    }

    alert("✅ Logo actualizado correctamente 🎉");
    router.reload();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#5A2D82" }}>{tienda.nombre}</h1>
      <p style={{ marginBottom: "1rem" }}>{tienda.descripcion}</p>
      <p><strong>Ubicación:</strong> {tienda.ubicacion}</p>
      {tienda.enlace && (
        <p>
          <strong>Red social:</strong>{" "}
          <a href={tienda.enlace} target="_blank" rel="noopener noreferrer">{tienda.enlace}</a>
        </p>
      )}

      <hr style={{ margin: "2rem 0", borderColor: "#ccc" }} />

      <h3 style={{ marginBottom: "1rem" }}>Sube o actualiza tu logo</h3>
      <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

      <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#666" }}>
        ⚠️ La imagen será almacenada en tu carpeta privada. Inicia sesión antes de subirla.
      </p>

      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Vista previa:</h4>
          <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
        </div>
      )}

      <button
        disabled={subiendo}
        onClick={subirLogo}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#5A2D82",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: subiendo ? "not-allowed" : "pointer",
        }}
      >
        {subiendo ? "Subiendo..." : "Guardar logo"}
      </button>

      {tienda.logo && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Logo actual:</h4>
          <img src={tienda.logo} alt={`Logo de ${tienda.nombre}`} style={{ maxWidth: "200px", borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}
