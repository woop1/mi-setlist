# Historias de Usuario - Mi Setlist

## HU1 - Buscar canciones

**Como** usuario

**Quiero** buscar canciones por nombre o artista

**Para** encontrar música para mi playlist.

### Criterios de aceptación

- Puedo escribir el nombre de una canción o un artista.
- Al presionar "Buscar" aparecen los resultados.
- Cada resultado muestra la carátula, nombre, artista y duración.
- Si no hay resultados, aparece un mensaje indicándolo.

---

## HU2 - Crear una playlist

**Como** usuario

**Quiero** crear una playlist con un nombre

**Para** organizar mis canciones.

### Criterios de aceptación

- Puedo escribir un nombre para la playlist.
- La playlist aparece en la lista después de crearla.
- Si el nombre está vacío, se muestra un mensaje de aviso.

---

## HU3 - Agregar canciones

**Como** usuario

**Quiero** agregar canciones a una playlist

**Para** crear mi setlist.

### Criterios de aceptación

- Cada canción tiene un botón para agregarla.
- La canción aparece dentro de la playlist.
- Se muestra la fecha en que fue agregada.

---

## HU4 - Ver una playlist

**Como** usuario

**Quiero** ver las canciones de una playlist

**Para** revisar su contenido.

### Criterios de aceptación

- Se muestran todas las canciones agregadas.
- Cada canción muestra su nombre y artista.
- También se muestra la fecha de agregado.

---

## HU5 - Eliminar canciones

**Como** usuario

**Quiero** eliminar canciones de una playlist

**Para** mantenerla actualizada.

### Criterios de aceptación

- Cada canción tiene un botón para eliminar.
- Antes de eliminar aparece una confirmación.
- Si acepto, la canción desaparece de la playlist.

---

## HU6 - Eliminar una playlist

**Como** usuario

**Quiero** eliminar una playlist

**Para** borrar listas que ya no necesito.

### Criterios de aceptación

- Cada playlist tiene un botón para eliminar.
- Antes de eliminar aparece una confirmación.
- Si acepto, la playlist desaparece.

---

## HU7 - Ver estadísticas

**Como** usuario

**Quiero** ver información de mi playlist

**Para** conocer mejor mi música.

### Criterios de aceptación

- Se muestra la cantidad de canciones.
- Se muestra la duración total.
- Se muestra el artista más repetido.
- Se muestra el género más frecuente.

---

## HU8 - Guardar la información

**Como** usuario

**Quiero** que mis playlists permanezcan guardadas

**Para** no perderlas al recargar la página.

### Criterios de aceptación

- Al recargar la página las playlists siguen disponibles.
- Si ocurre un problema con los datos guardados, aparece un mensaje.
- Existe una opción para comenzar de nuevo.


---

# 🚀 Funcionalidades Extra & Mejoras V2 (Beyond Specs)

Se integraron las siguientes mejoras avanzadas para elevar la aplicación a una experiencia multimedia completa tipo Spotify/Apple Music:

---

## HU9 (Extra) - Reproductor Global Multimedia

**Como** usuario  
**Quiero** un reproductor flotante en la parte inferior de la pantalla  
**Para** escuchar las canciones de mis playlists de forma continua y personalizada.

### Criterios de aceptación
- [x] La barra del reproductor permanece **fija y centrada** en la parte inferior de la pantalla.
- [x] Incluye un selector desplegable que carga automáticamente todas las playlists creadas.
- [x] Permite cambiar el modo de reproducción entre **▶️ En Orden** y **🔀 Aleatorio (Shuffle)**.
- [x] Al finalizar una canción (30 segundos de vista previa de iTunes), pasa **automáticamente** a la siguiente pista de la cola.
- [x] Permite avanzar o retroceder de canción manualmente mediante botones de pista anterior (⏮️) y siguiente (⏭️).

---

## 🎨 Mejora de UI/UX - Rediseño Dark Neón & Glassmorphism

**Como** usuario  
**Quiero** una interfaz moderna con tema oscuro, efectos de transparencia y diseño responsivo  
**Para** tener una navegación atractiva e intuitiva desde cualquier dispositivo.

### Criterios de aceptación
- [x] Estética visual basada en tonos oscuros con gradientes púrpuras y efectos neón en botones y títulos.
- [x] Tarjetas de contenido con efecto *Glassmorphism* (fondo translúcido con desenfoque `backdrop-filter`).
- [x] Adaptación responsiva que reorganiza la barra del reproductor y las secciones en dispositivos móviles.
- [x] Integración de la tipografía moderna *Plus Jakarta Sans* y personalización de la barra de desplazamiento (*scrollbar*).