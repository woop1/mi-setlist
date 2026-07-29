export class Cancion {
  // El constructor es la "plantilla" que recibe los datos crudos que vienen de la API de iTunes
  // y los organiza ordenadamente con nombres propios en español para nuestra aplicación
  constructor({
    trackId,
    trackName,
    artistName,
    artworkUrl100,
    trackTimeMillis,
    primaryGenreName,
    previewUrl // 👈 IMPORTANTE: Asegúrate de tener esta línea aquí para recibir el enlace de audio de 30 segundos
  }) {
    // Asigna cada dato técnico de iTunes a una propiedad más fácil de entender en nuestro código
    this.id = trackId;             // Código único de la canción
    this.nombre = trackName;       // Título o nombre de la canción
    this.artista = artistName;     // Nombre del cantante o grupo
    this.imagen = artworkUrl100;   // Enlace a la carátula o foto del disco
    this.duracion = trackTimeMillis; // Duración total medida en milisegundos
    this.genero = primaryGenreName; // Género musical principal
    this.preview = previewUrl;     // 👈 Y esta línea asignándola para poder reproducir la vista previa
  }
}