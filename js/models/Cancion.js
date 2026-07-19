export class Cancion {
  constructor({
    trackId,
    trackName,
    artistName,
    artworkUrl100,
    trackTimeMillis,
    primaryGenreName
  }) {
    this.id = trackId;
    this.nombre = trackName;
    this.artista = artistName;
    this.imagen = artworkUrl100;
    this.duracion = trackTimeMillis;
    this.genero = primaryGenreName;
  }
}
