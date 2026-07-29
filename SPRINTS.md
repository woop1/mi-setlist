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

> **Reto 1:** Al consultar a la IA por la API de iTunes, me devolvió por error una URL vieja de la API de RSS en lugar de la de búsqueda (`search?term=`), lo que hacía que la petición rompiera con un error 404 o datos vacíos que tuve que corregir revisando la estructura oficial.

> **Reto 2:** Al guardar y recargar las playlists desde el `localStorage`, los objetos de fecha y los métodos internos se corrompían o devolvían `null` al usar `JSON.parse()`, lo que obligó a estructurar validaciones defensivas y un proceso de rehidratación al iniciar la aplicación.