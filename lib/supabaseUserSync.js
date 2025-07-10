import { supabase } from "./supabaseClient";

/**
 * Registra o actualiza el usuario Pi en Supabase
 * @param {string} usernamePi - Username proporcionado por Pi Network
 * @param {string} rol - 'negociante' | 'comprador'
 */
export async function syncUsuarioPi(usernamePi, rol = "comprador") {
  if (!usernamePi) return;

  const { error } = await supabase
    .from("usuarios_pi")
    .upsert(
      {
        username: usernamePi,
        rol: rol,
        actualizado_en: new Date().toISOString(),
      },
      { onConflict: ["username"] }
    );

  if (error) {
    console.error("❌ Error al sincronizar usuario Pi:", error.message);
  } else {
    console.log("✅ Usuario Pi sincronizado:", usernamePi);
  }
}
