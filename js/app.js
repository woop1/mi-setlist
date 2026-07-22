// ==========================================
// APP.JS - Mi Setlist
// Controla los eventos de la aplicación
// ==========================================

import { buscarCanciones } from "./api.js";

import {
  mostrarCanciones,
  mostrarCarga,
  mostrarSinResultados,
  mostrarError,
  mostrarPlaylists,
  activarBotonesAgregar,
  activarBotonesEliminar

} from "./ui.js";

import { estado } from "./state.js";

import {
  guardar,
  cargar
} from "./storage.js";


// Elementos HTML

const formulario = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");

const formularioPlaylist = document.querySelector("#form-playlist");
const inputPlaylist = document.querySelector("#input-playlist");


// ==========================================
// HU8 - Guardar información
// Cargar playlists al abrir la página
// ==========================================

estado.playlists=cargar();

mostrarPlaylists(estado.playlists);

activarBotonesEliminar(eliminarCancion);



// ==========================================
// HU2 - Crear una playlist
// ==========================================

formularioPlaylist.addEventListener("submit",(evento)=>{

  evento.preventDefault();

  const nombre = inputPlaylist.value.trim();

  if(!nombre){

    alert("Escribe un nombre para la playlist");

    return;

  }


  const nuevaPlaylist = {
    id: crypto.randomUUID(),
    nombre: nombre,
    canciones: []
  };


estado.playlists.push(nuevaPlaylist);

guardar(estado.playlists);

mostrarPlaylists(estado.playlists);



  inputPlaylist.value = "";

});


// ==========================================
// HU1 - Buscar canciones
// ==========================================

formulario.addEventListener("submit",async(evento)=>{

  evento.preventDefault();


  const texto = inputBusqueda.value.trim();


  if(!texto){

    return;

  }


  try{

    mostrarCarga();


    const canciones = await buscarCanciones(texto);


    if(canciones.length === 0){

      mostrarSinResultados(texto);

      return;

    }


    mostrarCanciones(canciones);


    activarBotonesAgregar(agregarCancion);


  }catch(error){

    mostrarError();

    console.error(error);

  }

});


// ==========================================
// HU3 - Agregar canciones
// Guarda la información completa de la canción
// ==========================================

function agregarCancion(cancion){

  if(estado.playlists.length===0){
    alert("Primero crea una playlist");
    return;
  }

  const playlist=estado.playlists[0];

  const nuevaCancion={
    id:cancion.id,
    nombre:cancion.nombre,
    artista:cancion.artista,
    imagen:cancion.imagen,
    genero:cancion.genero,
    duracion:cancion.duracion,
    fechaAgregado:new Date()
  };

playlist.canciones.push(nuevaCancion);

guardar(estado.playlists);

mostrarPlaylists(estado.playlists);

}

function eliminarCancion(idCancion){

const confirmar=confirm("¿Eliminar esta canción?");

if(!confirmar){
return;
}

estado.playlists[0].canciones =
estado.playlists[0].canciones.filter(
(cancion)=>cancion.id != idCancion
);

guardar(estado.playlists);

mostrarPlaylists(estado.playlists);

activarBotonesEliminar(eliminarCancion);

}


