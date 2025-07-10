# 🗂️ Ayuda Memoria – LATAM PiComercio

## 🔧 Flujo Fiduciario AIGen

| Paso | Archivo / Componente           | Descripción                                |
|------|--------------------------------|--------------------------------------------|
| 1️⃣   | `lib/fideicomisoSchema.js`     | Esquema base de transacciones fiduciarias  |
| 2️⃣   | Supabase: tabla `fideicomisos` | Almacena cada transacción Pi entre partes  |
| 3️⃣   | `ConfirmacionEnvio.jsx`        | Vendedor confirma envío del pedido         |
| 4️⃣   | `ConfirmacionRecepcion.jsx`    | Comprador confirma recepción               |
| 5️⃣   | `validarFideicomisoAIGen.js`   | IA decide si liberar o abrir disputa       |
| 6️⃣   | `liberarPagoPi.js`             | Usa SDK Pi para enviar el pago al vendedor |

---

## 🛍️ Panel del Comerciante (iniciado)

| Archivo / Tabla      | Función                                      |
|----------------------|----------------------------------------------|
| `CrearProducto.jsx`  | Registro de productos con imagen y precio Pi |
| Tabla `productos`    | Estructura manual en Supabase                |
| Bucket `productos`   | Imágenes subidas — marcadas como públicas ✅ |

---

## 📦 Configuración Supabase Storage

- Buckets creados: `tiendas-logos`, `productos`
- Acceso público activado ✅
- Las imágenes se obtienen con `.getPublicUrl(nombre-archivo)`

---

## 🔄 Estados posibles del fideicomiso

- `pendiente` → esperando confirmaciones
- `validando` → IA procesando condiciones
- `liberado` → pago ejecutado vía Pi SDK
- `en_disputa` → retención por demora o falta
- `cancelado` → anulado antes de confirmar

---

## 🧩 Próximos pasos recomendados

- `ListadoProductos.jsx` → mostrar productos registrados por vendedor
- Panel del comprador → historial, recepción, estado
- Panel de IA/Moderación → evaluar disputas, métricas
- Traducción EN/ES, reputación, notificaciones push

---

## 📎 Identidad del proyecto

- Proyecto: **LATAM PiComercio**
- Pi User: `@frankito70` – Perú 🇵🇪
- Comunidad: Pioneros Latinoamericanos

---

> 📌 Guárdalo como `ayuda-memoria-picomercio.md` y vuelve a pegarlo cuando reinicies la conversación para continuar desde donde lo dejaste.
