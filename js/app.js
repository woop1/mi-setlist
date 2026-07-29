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

// 🔊 IMPORTANTE: Importamos el módulo del reproductor global
import {
  actualizarSelectorPlaylists,
  inicializarReproductor
} from "./player.js";


// Referencias a los elementos del formulario y botones principales en la página (HTML)
const formulario = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");

const formularioPlaylist = document.querySelector("#form-playlist");
const inputPlaylist = document.querySelector("#input-playlist");
const btnReset = document.querySelector("#btn-reset"); // HU8


// ==========================================
// HU8 - Función centralizada de renderizado
// ==========================================

// Actualiza la pantalla mostrando las playlists, el reproductor y las estadísticas, y reactiva los botones
function renderizarYReactivar() {
  // Muestra las playlists guardadas en la interfaz visual
  mostrarPlaylists(estado.playlists);
  
  // 🔊 Mantiene actualizado el selector del reproductor con las playlists actuales
  actualizarSelectorPlaylists(estado.playlists);
  
  // Si agregaste las estadísticas en ui.js, se invocan aquí:
  if (typeof calcularYMostrarEstadisticas === "function") {
    calcularYMostrarEstadisticas(estado.playlists);
  }

  // Reactiva los botones para poder borrar canciones o playlists de nuevo
  activarBotonesEliminar(eliminarCancion);
  activarBotonesEliminarPlaylist(eliminarPlaylist);
}

// Al iniciar la app, carga los datos guardados en la memoria del navegador (o crea una lista vacía si no hay nada)
estado.playlists = cargar() || [];
renderizarYReactivar();

// 🔊 Inicializamos los eventos del reproductor (controles, cambio de pista, aleatorio)
inicializarReproductor(() => estado.playlists);


// ==========================================
// HU8 - Opción "Comenzar de nuevo" (Reset)
// ==========================================

// Si el botón de reset existe, al hacer clic borra toda la memoria y deja la app como nueva
if (btnReset) {
  btnReset.addEventListener("click", () => {
    // Pide confirmación al usuario antes de borrar todo
    const confirmar = confirm("¿Seguro que quieres borrar todas tus playlists y comenzar de nuevo?");
    if (confirmar) {
      localStorage.removeItem("mi-setlist"); // Borra la memoria del navegador
      estado.playlists = [];                 // Vacía la lista en el programa
      renderizarYReactivar();                  // Refresca la pantalla
    }
  });
}


// ==========================================
// HU2 - Crear una playlist
// ==========================================

// Cuando el usuario escribe el nombre de una nueva playlist y presiona "Crear"
formularioPlaylist.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita que la página se recargue sola

  // Quita los espacios vacíos del texto escrito
  const nombre = inputPlaylist.value.trim();

  // Si no escribió nada, muestra una advertencia
  if (!nombre) {
    alert("Escribe un nombre para la playlist");
    return;
  }

  // Crea el objeto de la nueva playlist con un código único (ID), nombre y canciones vacías
  const nuevaPlaylist = {
    id: crypto.randomUUID(),
    nombre: nombre,
    canciones: []
  };

  // Añade la playlist a la lista general y la guarda en la memoria del navegador
  estado.playlists.push(nuevaPlaylist);
  guardar(estado.playlists);

  // Actualiza la pantalla
  renderizarYReactivar();

  // Limpia el cuadro de texto para escribir otra cosa
  inputPlaylist.value = "";
});


// ==========================================
// HU1 - Buscar canciones
// ==========================================

// Cuando el usuario escribe algo en el buscador y presiona buscar
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Obtiene el texto de búsqueda limpio
  const texto = inputBusqueda.value.trim();

  // Si está vacío, no hace nada
  if (!texto) {
    return;
  }

  try {
    // Muestra un indicador de que está cargando mientras espera la respuesta de internet
    mostrarCarga();

    // Busca las canciones en la API de manera asíncrona
    const canciones = await buscarCanciones(texto);

    // Si no encuentra resultados, avisa al usuario
    if (canciones.length === 0) {
      mostrarSinResultados(texto);
      return;
    }

    // Muestra los resultados en pantalla y activa los botones para agregarlas
    mostrarCanciones(canciones);
    activarBotonesAgregar(agregarCancion);

  } catch (error) {
    // Si ocurre un error de conexión, avisa en pantalla y en la consola
    mostrarError();
    console.error("Error al buscar canciones:", error);
  }
});


// ==========================================
// HU3 - Agregar canciones a una playlist específica
// ==========================================

// Función que se ejecuta al hacer clic en "Agregar" en una canción buscada
function agregarCancion(cancion) {
  // 1. Valida si existen playlists creadas
  if (estado.playlists.length === 0) {
    alert("Primero debes crear al menos una playlist.");
    return;
  }

  // Por defecto toma la primera playlist
  let playlistObjetivo = estado.playlists[0];

  // 2. Si hay más de una playlist, le pregunta al usuario a cuál de ellas quiere agregar la canción
  if (estado.playlists.length > 1) {
    const opciones = estado.playlists
      .map((p, index) => `${index + 1}. ${p.nombre}`)
      .join("\n");

    const respuesta = prompt(
      `¿A qué playlist deseas agregar "${cancion.nombre}"?\nEscribe el número correspondiente:\n\n${opciones}`
    );

    // Si el usuario cancela la ventana emergente, se detiene
    if (respuesta === null) return;

    // Convierte la respuesta del usuario en un número de índice (restando 1)
    const indiceElegido = parseInt(respuesta) - 1;

    // Valida si el número ingresado es un número válido y existe en la lista
    if (
      isNaN(indiceElegido) ||
      indiceElegido < 0 ||
      indiceElegido >= estado.playlists.length
    ) {
      alert("Opción no válida. La canción no se agregó.");
      return;
    }

    // Asigna la playlist elegida por el usuario
    playlistObjetivo = estado.playlists[indiceElegido];
  }

  // 3. Valida si la canción ya existe dentro de esa playlist para no repetirla
  const yaExiste = playlistObjetivo.canciones.some(
    (item) => String(item.id) === String(cancion.id)
  );

  if (yaExiste) {
    alert(`La canción "${cancion.nombre}" ya está en la playlist "${playlistObjetivo.nombre}".`);
    return;
  }

  // 4. Crea el objeto con todos los datos detallados de la canción y la fecha actual en que se agregó
  const nuevaCancion = {
    id: cancion.id,
    nombre: cancion.nombre,
    artista: cancion.artista,
    imagen: cancion.imagen,
    genero: cancion.genero,
    duracion: cancion.duracion,
    preview: cancion.preview,
    fechaAgregado: new Date()
  };

  // 5. Inserta la canción en la playlist seleccionada, guarda los cambios y refresca la pantalla
  playlistObjetivo.canciones.push(nuevaCancion);

  guardar(estado.playlists);
  renderizarYReactivar();

  alert(`"${cancion.nombre}" se agregó a "${playlistObjetivo.nombre}" 🎵`);
}


// ==========================================
// HU5 - Eliminar canciones
// ==========================================

// Función que borra una canción específica de una playlist al confirmar con el usuario
function eliminarCancion(idCancion, idPlaylist) {
  const confirmar = confirm("¿Eliminar esta canción?");

  if (!confirmar) {
    return;
  }

  // Busca la playlist a la que pertenece la canción (o usa la primera por defecto)
  const targetPlaylist = idPlaylist
    ? estado.playlists.find((p) => String(p.id) === String(idPlaylist))
    : estado.playlists[0];

  if (targetPlaylist) {
    // Filtra la lista quitando la canción que coincide con el ID a eliminar
    targetPlaylist.canciones = targetPlaylist.canciones.filter(
      (cancion) => String(cancion.id) !== String(idCancion)
    );

    // Guarda los cambios y actualiza la pantalla
    guardar(estado.playlists);
    renderizarYReactivar();
  }
}


// ==========================================
// HU6 - Eliminar playlist
// ==========================================

// Función que borra por completo una playlist entera al confirmar con el usuario
function eliminarPlaylist(idPlaylist) {
  const confirmar = confirm("¿Eliminar esta playlist?");

  if (!confirmar) {
    return;
  }

  // Filtra la lista general de playlists eliminando la que coincide con el ID
  estado.playlists = estado.playlists.filter(
    (playlist) => String(playlist.id) !== String(idPlaylist)
  );

  // Guarda los cambios y actualiza la pantalla
  guardar(estado.playlists);
  renderizarYReactivar();
}