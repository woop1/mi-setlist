import { buscarCanciones } from "./api.js";
import {
  mostrarCanciones,
  mostrarCarga,
  mostrarSinResultados,
  mostrarError,
  mostrarPlaylists
} from "./ui.js";
import { estado } from "./state.js";


const formulario = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");
const formularioPlaylist = document.querySelector("#form-playlist");
const inputPlaylist = document.querySelector("#input-playlist");

formularioPlaylist.addEventListener("submit", (evento) => {

  evento.preventDefault();

  const nombre = inputPlaylist.value.trim();


  if (!nombre) {
    alert("Escribe un nombre para la playlist");
    return;
  }


  const nuevaPlaylist = {
    id: crypto.randomUUID(),
    nombre,
    canciones: []
  };


  estado.playlists.push(nuevaPlaylist);

  mostrarPlaylists(estado.playlists);

  inputPlaylist.value = "";

});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const texto = inputBusqueda.value.trim();

  if (!texto) {
    return;
  }

  try {

    mostrarCarga();

    const canciones = await buscarCanciones(texto);

    if (canciones.length === 0) {
      mostrarSinResultados(texto);
      return;
    }

    mostrarCanciones(canciones);

  } catch (error) {

    mostrarError();

    console.error(error);

  }

});
