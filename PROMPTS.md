# PROMPTS.md

## 14/07/2026 — Descomposición del MVP en historias de usuario

### Para qué

Derivar las historias de usuario del proyecto Mi Setlist.

### Prompt

[CONTEXTO]

Estoy desarrollando el proyecto final del curso Code 201.

Contrato técnico:

- HTML5
- CSS3
- JavaScript Vanilla con módulos ESM
- Estado central
- LocalStorage
- API iTunes
- Sin frameworks
- Sin backend

MVP:

- Buscar canciones
- Mostrar resultados
- Crear playlists   
- Agregar canciones
- Eliminar canciones
- Eliminar playlists
- Ver duración
- Ver estadísticas
- Ordenar canciones
- Guardar datos

[TAREA]

Descompón el MVP en historias de usuario para una persona desarrollando el proyecto en dos sprints.

[FORMATO]

Historia:
Como...
Quiero...
Para...

Agregar entre 3 y 5 criterios de aceptación.

[RESTRICCIÓN]

Los criterios deben describir únicamente resultados observables por el usuario y no detalles de implementación.

### Resultado

Se obtuvo una primera versión de las historias de usuario. Posteriormente se ajustaron algunos criterios para hacerlos más simples y asegurar que cubrieran todo el MVP.


---

## 19/07/2026 — Implementación de HU1: Buscar canciones

### Para qué

Implementar la historia de usuario de búsqueda de canciones usando la API de iTunes y conectar los resultados con la interfaz.

### Prompt

[CONTEXTO]

Estoy desarrollando Mi Setlist con:

- HTML5
- CSS3
- JavaScript Vanilla con módulos ESM
- Estado central
- LocalStorage
- API iTunes
- Sin frameworks

Actualmente el proyecto cuenta con la estructura inicial del repositorio y los archivos JavaScript separados por responsabilidades.

[TAREA]

Implementemos juntos la HU1:

Como usuario quiero buscar canciones por nombre o artista para encontrar música para mi playlist.

Criterios de aceptación:

- Puedo escribir el nombre de una canción o un artista.
- Al presionar "Buscar" aparecen los resultados.
- Cada resultado muestra carátula, nombre, artista y duración.
- Si no hay resultados, aparece un mensaje indicándolo.

[MODO]

Antes de escribir código, realiza 2 o 3 preguntas estratégicas sobre decisiones de diseño. Espera mis respuestas y después entrega el código en porciones pequeñas explicando qué hace cada parte y dónde debe colocarse.

[RESTRICCIÓN]

Respeta la arquitectura del proyecto. No reescribas archivos completos si no es necesario. El código debe estar separado según responsabilidades.

### Resultado

Se definieron decisiones de diseño para la búsqueda y se implementó la funcionalidad por partes. La HU quedó preparada para validarse contra sus criterios de aceptación y realizar su commit correspondiente.


---

## 22/07/2026 — Implementación de HU2 y HU3: Crear playlist y Agregar canciones

### Para qué
Implementar la creación de playlists y la lógica para agregar canciones desde los resultados de búsqueda evitando duplicados y gestionando múltiples listas.

### Prompt
[CONTEXTO]
Proyecto Mi Setlist en JavaScript con módulos ESM. Ya contamos con la búsqueda en la API de iTunes en `api.js` y `ui.js`.

[TAREA]
Implementemos juntos HU2 (Crear playlist) y HU3 (Agregar canciones).
- HU2: Crear playlist con un nombre. Si está vacío, mostrar aviso.
- HU3: Agregar canciones a una playlist desde los resultados, mostrando su fecha de agregado.

[MODO]
Hazme 2 o 3 preguntas sobre decisiones de UX (¿qué pasa si hay más de una playlist? ¿se permiten canciones repetidas?) y espera mis respuestas antes de darme el código.

[RESTRICCIÓN]
Mantener el estado centralizado y separar responsabilidades entre `app.js` y `ui.js`.

### Resultado
Se decidió solicitar mediante una ventana/prompt a qué playlist agregar cuando exista más de una, y validar que la canción no exista previamente usando su ID.


---

## 22/07/2026 — Implementación de HU4, HU5 y HU6: Ver y Eliminar playlists y canciones

### Para qué
Renderizar las canciones dentro de cada lista y permitir la eliminación individual de canciones y playlists completas con confirmación previa.

### Prompt
[CONTEXTO]
Aplicación Mi Setlist. Ya podemos crear playlists y agregarles canciones en el estado.

[TAREA]
Implementar HU4 (Ver playlist), HU5 (Eliminar canciones) y HU6 (Eliminar playlist).
- Botón de eliminación en cada canción y en cada playlist.
- Confirmación mediante alerta/mensaje antes de eliminar.
- Actualización inmediata de la pantalla.

[MODO]
Pregúntame cómo estructurar el re-renderizado del DOM al eliminar elementos y entrega el código por partes.

### Resultado
Se implementó la función centralizada `renderizarYReactivar()` que limpia el contenedor, redibuja todas las playlists con sus canciones y vuelve a asociar los eventos `onclick` a los nuevos botones usando datos `data-*`.


---

## 22/07/2026 — Implementación de HU7 y HU8: Estadísticas, LocalStorage y Reset

### Para qué
Calcular métricas globales de la música guardada y asegurar la persistencia de datos tras recargar la página.

### Prompt
[CONTEXTO]
Proyecto Mi Setlist listo con búsquedas, playlists y eliminación.

[TAREA]
Implementar HU7 (Ver estadísticas: total canciones, minutos acumulados, artista principal, género frecuente) y HU8 (Guardar información en LocalStorage y opción de reset).

[MODO]
Dime cómo procesar las canciones de múltiples playlists en `ui.js` y cómo manejar la rehidratación de fechas al leer de LocalStorage.

### Resultado
Se utilizaron métodos array como `.flatMap()` y `.reduce()` para calcular las métricas globales. En `storage.js` se implementó `try/catch` con `JSON.stringify`/`JSON.parse` para la persistencia, y se agregó la opción de reiniciar la app mediante `localStorage.removeItem()`.


---

## 22/07/2026 — Implementación de Funcionalidades Extra & Mejoras V2 (HU9 y Rediseño UI/UX)

### Para qué

Expandir el alcance original del MVP implementando las funcionalidades de la sección "Extra & Mejoras V2": el reproductor multimedia flotante centrado (HU9) y la renovación estética a un estilo Dark Neón con Glassmorphism.

### Prompt

[CONTEXTO]

Proyecto Mi Setlist listo y funcional con las historias de usuario HU1 a HU8. 

Quiero implementar una iteración de mejoras avanzadas (V2) para superar las especificaciones iniciales:
- HU9 (Extra): Reproductor Global Multimedia con lista desplegable de playlists, reproducción automática, avance/retroceso y modo aleatorio (Shuffle).
- Rediseño UI/UX: Interfaz estilo Dark Neón / Glassmorphism.

[TAREA]

1. Crear el módulo `player.js` e integrarlo con el estado global para manejar la reproducción continua de las previews de iTunes (30s) y el cambio entre modos "En Orden" y "Aleatorio".
2. Actualizar `styles.css` para aplicar estética oscura con desenfoques `backdrop-filter`.
3. Ajustar la maquetación del reproductor `#reproductor-global` para que se ubique exactamente en el centro de la parte inferior de la pantalla sin solaparse con otros elementos.

[MODO]

Muestra los cambios necesarios de manera modular. Explica la lógica del centrado CSS (`transform: translateX(-50%)`) y cómo sincronizar las selecciones de playlists del reproductor con `state.js`.

[RESTRICCIÓN]

No romper ninguna funcionalidad existente de las HU1 a HU8. Mantener el proyecto en Vanilla JS sin librerías externas.

### Resultado

Se incorporó exitosamente la sección de Funcionalidades Extra V2 en el proyecto:
- **HU9 cumplida:** Se creó el módulo `player.js` habilitando la reproducción continua y aleatoria de previews de audio.
- **UI/UX centrada y estilizada:** Se aplicó el tema Dark Neón con Glassmorphism y se alineó correctamente la barra del reproductor al centro inferior mediante CSS Flexbox y posicionamiento absoluto/fijo.