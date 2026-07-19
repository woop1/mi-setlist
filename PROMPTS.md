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
