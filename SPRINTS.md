# 🗺️ Plan de Sprints — Mi Setlist

## 🎯 Sprint 1 — Meta: Tener una aplicación funcional donde pueda buscar canciones y crear una playlist con música agregada.

- [x] **HU1: Buscar canciones**  
  *Justificación:* Va primero porque necesito obtener canciones desde la API de iTunes antes de poder trabajar con playlists.
- [x] **HU2: Crear una playlist**  
  *Justificación:* Es necesaria para tener un espacio donde guardar las canciones.
- [x] **HU3: Agregar canciones**  
  *Justificación:* Permite conectar los resultados de búsqueda con las playlists creadas.
- [x] **HU4: Ver una playlist**  
  *Justificación:* Permite comprobar que las canciones agregadas se muestran correctamente en la interfaz.

---

## 🎯 Sprint 2 — Meta: Completar la gestión de playlists, estadísticas, guardar datos y preparar la aplicación para la presentación.

- [x] **HU5: Eliminar canciones**  
  *Justificación:* Permite modificar y actualizar las playlists existentes.
- [x] **HU6: Eliminar una playlist**  
  *Justificación:* Completa la administración global de las listas.
- [x] **HU7: Ver estadísticas**  
  *Justificación:* Procesa los datos agregados para mostrar la duración total, artista y género predominantes.
- [x] **HU8: Guardar la información (y Reset)**  
  *Justificación:* Permite que los datos permanezcan guardados tras recargar la página (`localStorage`).

---

## 🚀 Sprint 3 (Extra / V2) — Meta: Transformar la app en un reproductor multimedia con reproducción continua y UI neón profesional.

- [x] **HU9 (Extra): Reproductor Global Multimedia**  
  *Justificación:* Eleva la app de un simple organizador a un reproductor activo tipo Spotify, permitiendo reproducir listas completas, cambiar de modo (orden/aleatorio) y avanzar automáticamente entre tracks.
- [x] **Mejora UI/UX: Rediseño Dark Neón & Glassmorphism**  
  *Justificación:* Aplica una capa estética moderna con temas oscuros, tarjetas translúcidas y centrado flotante del reproductor para mejorar radicalmente la experiencia del usuario.

---

## 🔗 Dependencias detectadas

- **Para HU3** necesito antes **HU1**, ya que se requieren canciones obtenidas desde la búsqueda.
- **Para HU7** necesito antes **HU3**, porque las estadísticas dependen de las canciones agregadas a las playlists.
- **Para HU8** necesito antes **HU2** y **HU3**, para contar con datos estructurados que persistir en `localStorage`.
- **Para HU9** necesito antes **HU8** y la captura de `previewUrl`, ya que el reproductor global consume las canciones guardadas en el estado con sus enlaces de audio.

---

## ⚡ Retos técnicos principales (Resueltos)

> **Reto identificado en Sprint 1:** La historia que más me intimidaba era la **HU1 (Buscar canciones)**, porque requería conectarse con una API externa (iTunes), manejar peticiones asíncronas, errores de red y renderizar dinámicamente las carátulas y resultados.
> 
> **Resultado:** ¡Superado! Se resolvió utilizando peticiones `fetch` con `async/await` en `api.js`, manejando adecuadamente los bloques `try/catch` y mostrando indicadores de carga, búsqueda vacía y error en la interfaz.

> **Reto identificado en Sprint 3 (V2):** El desafío principal en la **HU9 (Reproductor Global)** fue desacoplar el estado de reproducción en un módulo propio (`player.js`) para que la barra flotante inferior se mantuviera centrada, sincronizara dinámicamente las playlists de `state.js` y gestionara el paso automático a la siguiente canción (*autoplay queue*).