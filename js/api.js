import { Cancion } from "./models/Cancion.js";

const ENDPOINT = "https://itunes.apple.com/search";

export async function buscarCanciones(texto) {
  try {
    const url = `${ENDPOINT}?term=${encodeURIComponent(texto)}&entity=song&limit=10`;

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información");
    }

    const datos = await respuesta.json();

    return datos.results.map(cancion => new Cancion(cancion));

  } catch (error) {
    console.error(error);
    throw error;
  }
}
