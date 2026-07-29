// ==========================================
// API - Mi Setlist
// Comunicación asíncrona con la API de iTunes
// ==========================================

import { Cancion } from "./models/Cancion.js";

// Dirección web oficial a donde haremos las peticiones para buscar música
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
    // (Asegura que espacios o tildes no rompan el enlace web) y limitando a 10 resultados
    const url = `${ENDPOINT}?term=${encodeURIComponent(texto)}&entity=song&limit=10`;

    // 2. Petición asíncrona con fetch (espera a que internet responda al servidor de Apple)
    const respuesta = await fetch(url);

    // 3. Control de errores HTTP (ej. si la página da error 404 o el servidor falla)
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la información");
    }

    // 4. Transformación de la respuesta recibida a formato JSON (datos legibles por JavaScript)
    const datos = await respuesta.json();

    // 5. Mapeo de resultados: transforma cada elemento bruto de Apple en un objeto ordenado de nuestra clase Cancion
    return datos.results.map((cancion) => new Cancion(cancion));

  } catch (error) {
    // Si algo falla por el camino (ej. sin internet), lo muestra en la consola y relanza el error
    console.error("Error al conectar con la API de iTunes:", error);
    throw error;
  }
}