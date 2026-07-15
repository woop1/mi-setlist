# Plan de Sprints - Mi Setlist

## Sprint 1 (Clase 18) — Meta: Tener una aplicación funcional donde pueda buscar canciones y crear una playlist con música agregada.

- HU1: Buscar canciones  
  Va primero porque necesito obtener canciones desde la API antes de poder trabajar con playlists.

- HU2: Crear una playlist  
  Es necesaria para tener un espacio donde guardar las canciones.

- HU3: Agregar canciones  
  Permite conectar los resultados de búsqueda con las playlists.

- HU4: Ver una playlist  
  Permite comprobar que las canciones agregadas se muestran correctamente.


## Sprint 2 (Clase 19) — Meta: Completar la gestión de playlists, guardar datos y preparar la aplicación para la presentación.

- HU5: Eliminar canciones  
  Permite modificar playlists existentes.

- HU6: Eliminar una playlist  
  Completa la administración de playlists.

- HU7: Ver estadísticas  
  Necesita canciones guardadas para mostrar información útil.

- HU8: Guardar la información  
  Permite que los datos permanezcan después de recargar la página.


## Dependencias detectadas

- Para HU3 necesito antes HU1 porque necesito tener canciones obtenidas desde la búsqueda.
- Para HU7 necesito antes HU3 porque las estadísticas dependen de las canciones agregadas.
- Para HU8 necesito antes HU2 y HU3 porque necesito tener datos creados para guardar.


## Mi reto técnico principal

La HU que más me intimida es HU1: Buscar canciones porque requiere conectarse con una API externa, manejar respuestas, errores y mostrar correctamente los resultados en pantalla.
