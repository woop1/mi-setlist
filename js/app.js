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
  activarBotonesEliminar,
  activarBotonesEliminarPlaylist
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
// HU8 - Guardar información / Inicialización
// ==========================================

function renderizarYReactivar() {
  mostrarPlaylists(estado.playlists);
  activarBotonesEliminar(eliminarCancion);
  activarBotonesEliminarPlaylist(eliminarPlaylist);
}

// Cargar datos guardados e inicializar vistas y eventos
estado.playlists = cargar() || [];
renderizarYReactivar();


// ==========================================
// HU2 - Crear una playlist
// ==========================================

formularioPlaylist.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = inputPlaylist.value.trim();

  if (!nombre) {
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

  renderizarYReactivar();

  inputPlaylist.value = "";
});


// ==========================================
// HU1 - Buscar canciones
// ==========================================

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
    activarBotonesAgregar(agregarCancion);

  } catch (error) {
    mostrarError();
    console.error("Error al buscar canciones:", error);
  }
});


// ==========================================
// HU3 - Agregar canciones
// ==========================================

function agregarCancion(cancion) {
  if (estado.playlists.length === 0) {
    alert("Primero crea una playlist");
    return;
  }

  // Agrega por defecto a la primera playlist activa
  const playlist = estado.playlists[0];

  // Verificar si la canción ya existe en esta playlist
  const yaExiste = playlist.canciones.some(
    (item) => String(item.id) === String(cancion.id)
  );

  if (yaExiste) {
    alert(`La canción "${cancion.nombre}" ya está en la playlist "${playlist.nombre}".`);
    return;
  }

  const nuevaCancion = {
    id: cancion.id,
    nombre: cancion.nombre,
    artista: cancion.artista,
    imagen: cancion.imagen,
    genero: cancion.genero,
    duracion: cancion.duracion,
    fechaAgregado: new Date()
  };

  playlist.canciones.push(nuevaCancion);

  guardar(estado.playlists);
  renderizarYReactivar();
}


// ==========================================
// HU5 - Eliminar canciones
// ==========================================

function eliminarCancion(idCancion, idPlaylist) {
  const confirmar = confirm("¿Eliminar esta canción?");

  if (!confirmar) {
    return;
  }

  // Si se pasa idPlaylist lo usamos; de lo contrario fallback a la primera playlist
  const targetPlaylist = idPlaylist
    ? estado.playlists.find((p) => String(p.id) === String(idPlaylist))
    : estado.playlists[0];

  if (targetPlaylist) {
    targetPlaylist.canciones = targetPlaylist.canciones.filter(
      (cancion) => String(cancion.id) !== String(idCancion)
    );

    guardar(estado.playlists);
    renderizarYReactivar();
  }
}


// ==========================================
// HU6 - Eliminar playlist
// ==========================================

function eliminarPlaylist(idPlaylist) {
  const confirmar = confirm("¿Eliminar esta playlist?");

  if (!confirmar) {
    return;
  }

  estado.playlists = estado.playlists.filter(
    (playlist) => String(playlist.id) !== String(idPlaylist)
  );

  guardar(estado.playlists);
  renderizarYReactivar();
}