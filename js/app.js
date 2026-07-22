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
  activarBotonesEliminarPlaylist,
  calcularYMostrarEstadisticas // HU7
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
const btnReset = document.querySelector("#btn-reset"); // HU8


// ==========================================
// HU8 - Función centralizada de renderizado
// ==========================================

function renderizarYReactivar() {
  mostrarPlaylists(estado.playlists);
  
  // Si agregaste las estadísticas en ui.js, se invocan aquí:
  if (typeof calcularYMostrarEstadisticas === "function") {
    calcularYMostrarEstadisticas(estado.playlists);
  }

  activarBotonesEliminar(eliminarCancion);
  activarBotonesEliminarPlaylist(eliminarPlaylist);
}

// Cargar datos guardados e inicializar vistas y eventos
estado.playlists = cargar() || [];
renderizarYReactivar();


// ==========================================
// HU8 - Opción "Comenzar de nuevo" (Reset)
// ==========================================

if (btnReset) {
  btnReset.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que quieres borrar todas tus playlists y comenzar de nuevo?");
    if (confirmar) {
      localStorage.removeItem("mi-setlist");
      estado.playlists = [];
      renderizarYReactivar();
    }
  });
}


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
// HU3 - Agregar canciones a una playlist específica
// ==========================================

function agregarCancion(cancion) {
  // 1. Validar si existen playlists
  if (estado.playlists.length === 0) {
    alert("Primero debes crear al menos una playlist.");
    return;
  }

  let playlistObjetivo = estado.playlists[0];

  // 2. Si hay más de una playlist, le preguntamos al usuario a cuál agregar
  if (estado.playlists.length > 1) {
    const opciones = estado.playlists
      .map((p, index) => `${index + 1}. ${p.nombre}`)
      .join("\n");

    const respuesta = prompt(
      `¿A qué playlist deseas agregar "${cancion.nombre}"?\nEscribe el número correspondiente:\n\n${opciones}`
    );

    // Si el usuario cancela la ventana emergente
    if (respuesta === null) return;

    const indiceElegido = parseInt(respuesta) - 1;

    // Validar si la opción ingresada es válida
    if (
      isNaN(indiceElegido) ||
      indiceElegido < 0 ||
      indiceElegido >= estado.playlists.length
    ) {
      alert("Opción no válida. La canción no se agregó.");
      return;
    }

    playlistObjetivo = estado.playlists[indiceElegido];
  }

  // 3. Validar si la canción ya existe en LA PLAYLIST SELECCIONADA
  const yaExiste = playlistObjetivo.canciones.some(
    (item) => String(item.id) === String(cancion.id)
  );

  if (yaExiste) {
    alert(`La canción "${cancion.nombre}" ya está en la playlist "${playlistObjetivo.nombre}".`);
    return;
  }

  // 4. Crear el objeto de la canción con su fecha de agregado
  const nuevaCancion = {
    id: cancion.id,
    nombre: cancion.nombre,
    artista: cancion.artista,
    imagen: cancion.imagen,
    genero: cancion.genero,
    duracion: cancion.duracion,
    fechaAgregado: new Date()
  };

  // 5. Insertar en la playlist elegida, guardar y refrescar UI
  playlistObjetivo.canciones.push(nuevaCancion);

  guardar(estado.playlists);
  renderizarYReactivar(); // ✅ ¡AQUÍ ESTABA EL ERROR! Usamos renderizarYReactivar()

  alert(`"${cancion.nombre}" se agregó a "${playlistObjetivo.nombre}" 🎵`);
}


// ==========================================
// HU5 - Eliminar canciones
// ==========================================

function eliminarCancion(idCancion, idPlaylist) {
  const confirmar = confirm("¿Eliminar esta canción?");

  if (!confirmar) {
    return;
  }

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