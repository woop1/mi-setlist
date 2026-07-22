// ==========================================
// API - Mi Setlist
// Comunicación asíncrona con la API de iTunes
// ==========================================

import { Cancion } from "./models/Cancion.js";

const ENDPOINT = "https://itunes.apple.com/search";

/**
 * HU1 - Buscar canciones
 * Realiza una petición GET a la API de iTunes filtrando por canciones.
 * @param {string} texto - Término de búsqueda ingresado por el usuario.
 * @return {Promise<Cancion[]>} Arreglo de instancias de la clase Cancion.
 */
export async function buscarCanciones(texto) {
  try {
    // 1. Construcción de la URL codificando el parámetro de búsqueda
    const url = `${ENDPOINT}?term=${encodeURIComponent(texto)}&entity=song&limit=10`;

    // 2. Petición asíncrona con fetch
    const respuesta = await fetch(url);

    // 3. Control de errores HTTP (ej. status 404, 500)
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información");
    }

    // 4. Transformación de la respuesta a JSON
    const datos = await respuesta.json();

    // 5. Mapeo de resultados pasando el objeto raw al constructor de Cancion
    return datos.results.map((cancion) => new Cancion(cancion));

  } catch (error) {
    console.error("Error al conectar con la API de iTunes:", error);
    throw error;
  }
}