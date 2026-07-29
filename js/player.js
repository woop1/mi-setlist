// ==========================================
// PLAYER.JS - Reproductor Global Completo
// ==========================================

// Variables globales para recordar el estado actual de la música
let playlistActual = []; // Lista de canciones que se están reproduciendo
let indiceActual = 0;    // El número de la canción actual (empezando en 0)
let esAleatorio = false; // Indica si las canciones van en orden o al azar

// Referencias a los elementos visuales y de audio de la página (DOM)
const audio = document.querySelector("#audio-principal");
const img = document.querySelector("#player-img");
const titulo = document.querySelector("#player-titulo");
const artista = document.querySelector("#player-artista");
const selectPlaylist = document.querySelector("#player-select-playlist");
const btnModo = document.querySelector("#btn-modo-reproduccion");
const btnAnterior = document.querySelector("#btn-anterior");
const btnSiguiente = document.querySelector("#btn-siguiente");

/**
 * Llena el desplegable con las playlists disponibles
 */
export function actualizarSelectorPlaylists(playlists) {
  // Si el menú desplegable no existe en la página, se detiene aquí
  if (!selectPlaylist) return;
  
  // Reinicia el menú colocando una opción por defecto
  selectPlaylist.innerHTML = '<option value="">-- Elige Playlist --</option>';
  
  // Recorre cada playlist y crea una opción nueva para cada una en el menú
  playlists.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `🎵 ${p.nombre} (${p.canciones.length})`;
    selectPlaylist.appendChild(opt);
  });
}

/**
 * Inicializa los eventos del reproductor (lo que pasa al hacer clic o cambiar cosas)
 */
export function inicializarReproductor(obtenerPlaylists) {
  
  // 1. Evento cuando el usuario cambia de playlist en el menú desplegable
  selectPlaylist.addEventListener("change", (e) => {
    const playlists = obtenerPlaylists();
    const seleccionada = playlists.find((p) => String(p.id) === String(e.target.value));

    // Si encuentra la playlist y tiene canciones, la carga y reproduce la primera
    if (seleccionada && seleccionada.canciones.length > 0) {
      playlistActual = [...seleccionada.canciones];
      indiceActual = 0;
      reproducirCancionActual();
    } else if (seleccionada && seleccionada.canciones.length === 0) {
      // Si la playlist está vacía, avisa al usuario
      alert("Esta playlist no tiene canciones.");
    }
  });

  // 2. Evento para alternar entre reproducción en orden o aleatoria (al hacer clic en el botón de modo)
  btnModo.addEventListener("click", () => {
    esAleatorio = !esAleatorio; // Cambia el estado (si era falso pasa a verdadero y viceversa)
    btnModo.textContent = esAleatorio ? "🔀 Aleatorio" : "▶️ En Orden";
    btnModo.style.background = esAleatorio ? "#2563eb" : "#334155";
  });

  // 3. Evento para el botón de ir a la canción siguiente
  btnSiguiente.addEventListener("click", pasarSiguienteCancion);

  // 4. Evento para el botón de ir a la canción anterior
  btnAnterior.addEventListener("click", () => {
    if (playlistActual.length === 0) return;
    // Calcula matemáticamente el índice de la canción anterior de forma circular
    indiceActual = (indiceActual - 1 + playlistActual.length) % playlistActual.length;
    reproducirCancionActual();
  });

  // 5. Evento automático: cuando la canción actual termina sola, salta a la siguiente
  audio.addEventListener("ended", pasarSiguienteCancion);
}

/**
 * Función encargada de calcular cuál es la siguiente canción a reproducir
 */
function pasarSiguienteCancion() {
  if (playlistActual.length === 0) return;

  if (esAleatorio) {
    // Si está en modo aleatorio, busca un número de canción al azar diferente al actual
    let nuevoIndice = indiceActual;
    while (nuevoIndice === indiceActual && playlistActual.length > 1) {
      nuevoIndice = Math.floor(Math.random() * playlistActual.length);
    }
    indiceActual = nuevoIndice;
  } else {
    // Si está en orden, avanza de uno en uno de forma circular
    indiceActual = (indiceActual + 1) % playlistActual.length;
  }

  reproducirCancionActual();
}

/**
 * Función que actualiza la pantalla (imagen, título, artista) y reproduce el audio de la canción actual
 */
function reproducirCancionActual() {
  const cancion = playlistActual[indiceActual];
  if (!cancion) return;

  // Actualiza los datos visuales en la interfaz
  img.src = cancion.imagen || "https://via.placeholder.com/50";
  titulo.textContent = cancion.nombre;
  artista.textContent = cancion.artista;

  // Si la canción tiene archivo de audio (preview), lo carga y le da play
  if (cancion.preview) {
    audio.src = cancion.preview;
    audio.play();
  } else {
    alert("Esta canción no tiene vista previa de audio.");
  }
}