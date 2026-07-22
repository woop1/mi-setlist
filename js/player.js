// ==========================================
// PLAYER.JS - Reproductor Global Completo
// ==========================================

let playlistActual = [];
let indiceActual = 0;
let esAleatorio = false;

// Referencias a elementos del DOM
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
  if (!selectPlaylist) return;
  
  selectPlaylist.innerHTML = '<option value="">-- Elige Playlist --</option>';
  
  playlists.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `🎵 ${p.nombre} (${p.canciones.length})`;
    selectPlaylist.appendChild(opt);
  });
}

/**
 * Inicializa los eventos del reproductor
 */
export function inicializarReproductor(obtenerPlaylists) {
  // 1. Cambiar de playlist
  selectPlaylist.addEventListener("change", (e) => {
    const playlists = obtenerPlaylists();
    const seleccionada = playlists.find((p) => String(p.id) === String(e.target.value));

    if (seleccionada && seleccionada.canciones.length > 0) {
      playlistActual = [...seleccionada.canciones];
      indiceActual = 0;
      reproducirCancionActual();
    } else if (seleccionada && seleccionada.canciones.length === 0) {
      alert("Esta playlist no tiene canciones.");
    }
  });

  // 2. Alternar Modo (Orden / Aleatorio)
  btnModo.addEventListener("click", () => {
    esAleatorio = !esAleatorio;
    btnModo.textContent = esAleatorio ? "🔀 Aleatorio" : "▶️ En Orden";
    btnModo.style.background = esAleatorio ? "#2563eb" : "#334155";
  });

  // 3. Botón Siguiente
  btnSiguiente.addEventListener("click", pasarSiguienteCancion);

  // 4. Botón Anterior
  btnAnterior.addEventListener("click", () => {
    if (playlistActual.length === 0) return;
    indiceActual = (indiceActual - 1 + playlistActual.length) % playlistActual.length;
    reproducirCancionActual();
  });

  // 5. Al terminar una canción -> Pasar a la siguiente automáticamente
  audio.addEventListener("ended", pasarSiguienteCancion);
}

function pasarSiguienteCancion() {
  if (playlistActual.length === 0) return;

  if (esAleatorio) {
    let nuevoIndice = indiceActual;
    while (nuevoIndice === indiceActual && playlistActual.length > 1) {
      nuevoIndice = Math.floor(Math.random() * playlistActual.length);
    }
    indiceActual = nuevoIndice;
  } else {
    indiceActual = (indiceActual + 1) % playlistActual.length;
  }

  reproducirCancionActual();
}

function reproducirCancionActual() {
  const cancion = playlistActual[indiceActual];
  if (!cancion) return;

  img.src = cancion.imagen || "https://via.placeholder.com/50";
  titulo.textContent = cancion.nombre;
  artista.textContent = cancion.artista;

  if (cancion.preview) {
    audio.src = cancion.preview;
    audio.play();
  } else {
    alert("Esta canción no tiene vista previa de audio.");
  }
}