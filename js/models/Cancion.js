export class Cancion {
  constructor({
    trackId,
    trackName,
    artistName,
    artworkUrl100,
    trackTimeMillis,
    primaryGenreName,
    previewUrl // 👈 IMPORTANTE: Asegúrate de tener esta línea aquí
  }) {
    this.id = trackId;
    this.nombre = trackName;
    this.artista = artistName;
    this.imagen = artworkUrl100;
    this.duracion = trackTimeMillis;
    this.genero = primaryGenreName;
    this.preview = previewUrl; // 👈 Y esta línea asignándola
  }
}