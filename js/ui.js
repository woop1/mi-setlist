// ==========================================
// UI - Mi Setlist
// Maneja lo que aparece en pantalla
// ==========================================

// Referencias a los contenedores principales de la interfaz visual en la página
const resultados = document.querySelector("#resultados");
const listaPlaylists = document.querySelector("#lista-playlists");
const estadisticas = document.querySelector("#estadisticas");


// ==========================================
// HU1 - Buscar canciones
// ==========================================

// Muestra un mensaje temporal mientras se buscan canciones en internet
export function mostrarCarga() {
  resultados.innerHTML = `
    <p class="mensaje">
      ⏳ Buscando canciones...
    </p>
  `;
}

// Muestra un aviso cuando la búsqueda no arroja ningún resultado
export function mostrarSinResultados(texto) {
  resultados.innerHTML = `
    <p class="mensaje">
      🔎 No encontramos resultados para "${texto}".
    </p>
  `;
}

// Muestra un aviso de error si ocurre un fallo al intentar buscar
export function mostrarError() {
  resultados.innerHTML = `
    <p class="mensaje">
      ⚠️ Ocurrió un error al buscar canciones.
    </p>
  `;
}

// Recibe la lista de canciones encontradas y crea tarjetas visuales para cada una en la pantalla
export function mostrarCanciones(canciones) {
  resultados.innerHTML = ""; // Limpia los resultados anteriores

  canciones.forEach((cancion) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-cancion";

    // Inserta la estructura HTML de la tarjeta con la imagen, título, artista, duración y botón de agregar
    tarjeta.innerHTML = `
    <img src="${cancion.imagen}" alt="${cancion.nombre}">
    <div>
      <h3>${cancion.nombre}</h3>
      <p>👤 ${cancion.artista}</p>
      <p>⏱ ${formatearDuracion(cancion.duracion)}</p>

      <button 
        class="btn-agregar" 
        data-cancion='${JSON.stringify(cancion)}'
      >
        ➕ Agregar
      </button>
    </div>
  `;

  resultados.appendChild(tarjeta);
  });
}

// Convierte la duración de milisegundos a un formato de minutos y segundos legible (ej. 3:45)
function formatearDuracion(milisegundos) {
  const segundos = Math.floor(milisegundos / 1000);
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;

  return `${minutos}:${resto.toString().padStart(2, "0")}`;
}


// ==========================================
// HU4 - Ver playlist
// HU5 - Eliminar canciones
// HU6 - Eliminar playlist
// ==========================================

// Dibuja en la interfaz todas las playlists del usuario con sus respectivas canciones
export function mostrarPlaylists(playlists) {
  const contenedor = document.querySelector("#lista-playlists");
  if (!contenedor) return;

  // 1. Si no hay playlists creadas, muestra un mensaje indicándolo
  if (!playlists || playlists.length === 0) {
    contenedor.innerHTML = `<p class="mensaje">No tienes playlists todavía</p>`;
    return;
  }

  // 2. Limpiar contenido previo del contenedor
  contenedor.innerHTML = "";

  // 3. Recorre y renderiza CADA playlist existente
  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-card");
    playlistDiv.style.marginBottom = "20px";
    playlistDiv.style.border = "1px solid #334155";
    playlistDiv.style.padding = "10px";
    playlistDiv.style.borderRadius = "8px";

    let htmlCanciones = "";

    // Si la playlist está vacía, muestra un aviso; si tiene canciones, genera el HTML de cada una
    if (playlist.canciones.length === 0) {
      htmlCanciones = `<p class="mensaje" style="font-size: 0.85rem;">Sin canciones agregadas</p>`;
    } else {
      playlist.canciones.forEach((cancion) => {
        const fecha = cancion.fechaAgregado
          ? new Date(cancion.fechaAgregado).toLocaleDateString()
          : "";

        htmlCanciones += `
          <div class="cancion-item" style="display:flex; flex-direction:column; gap:6px; margin-top:10px; padding-bottom:8px; border-bottom:1px solid #1e293b;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${cancion.imagen}" alt="${cancion.nombre}" width="40" height="40" style="border-radius:4px;">
                <div>
                  <strong style="display:block; font-size:0.9rem;">${cancion.nombre}</strong>
                  <small style="color:#94a3b8;">${cancion.artista} • ${fecha}</small>
                </div>
              </div>
              <button class="btn-eliminar-cancion" data-id="${cancion.id}" data-playlist-id="${playlist.id}" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">
                ❌
              </button>
            </div>

            <!-- 🔊 Reproductor HTML5 de la vista previa (30s) en la playlist -->
            ${cancion.preview ? `<audio controls src="${cancion.preview}" style="height:28px; width:100%; margin-top:4px;"></audio>` : ''}
          </div>
        `;
      });
    }

    // Estructura visual principal de la tarjeta de la playlist (título, botón de eliminar lista y sus canciones)
    playlistDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 style="margin:0; font-size:1.1rem; color:#f8fafc;">🎵 ${playlist.nombre}</h3>
        <button class="btn-eliminar-playlist" data-playlist-id="${playlist.id}" style="background:transparent; color:#ef4444; border:1px solid #ef4444; padding:2px 6px; border-radius:4px; cursor:pointer;">
          Eliminar List
        </button>
      </div>
      <div class="canciones-contenedor">
        ${htmlCanciones}
      </div>
    `;

    contenedor.appendChild(playlistDiv);
  });
}


// ==========================================
// HU3 - Agregar canciones
// ==========================================

// Asocia la acción de hacer clic en los botones de agregar canción con la función encargada de procesarlo
export function activarBotonesAgregar(callback) {
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {
    boton.onclick = () => {
      const cancion = JSON.parse(boton.dataset.cancion);
      callback(cancion);
    };
  });
}


// ==========================================
// HU5 - Eliminar canciones
// ==========================================

// Configura los eventos de clic en los botones de eliminar canción para extraer sus identificadores
export function activarBotonesEliminar(handlerEliminarCancion) {
  const botones = document.querySelectorAll(".btn-eliminar-cancion");
  botones.forEach((btn) => {
    btn.onclick = () => {
      const cancionId = btn.getAttribute("data-id");
      const playlistId = btn.getAttribute("data-playlist-id");
      handlerEliminarCancion(cancionId, playlistId);
    };
  });
}


// ==========================================
// HU6 - Eliminar playlist
// ==========================================

// Configura los eventos de clic en los botones de eliminar playlist para capturar su ID
export function activarBotonesEliminarPlaylist(handlerEliminarPlaylist) {
  const botones = document.querySelectorAll(".btn-eliminar-playlist");
  botones.forEach((btn) => {
    btn.onclick = () => {
      const playlistId = btn.getAttribute("data-playlist-id");
      handlerEliminarPlaylist(playlistId);
    };
  });
}


// ==========================================
// HU7 - Estadísticas
// ==========================================

// Muestra los datos estadísticos calculados directamente en pantalla
export function mostrarEstadisticas(datos) {
  if (!estadisticas) {
    return;
  }

  estadisticas.innerHTML = `
    <p>🎵 Canciones: ${datos.cantidad}</p>
    <p>⏱ Duración: ${datos.duracion}</p>
    <p>👤 Artista principal: ${datos.artista}</p>
    <p>🎸 Género: ${datos.genero}</p>
  `;
}

// Calcula métricas globales de todas las playlists (cantidad, duración total, artista y género favorito)
export function calcularYMostrarEstadisticas(playlists) {
  if (!estadisticas) return;

  // Une todas las canciones de todas las playlists en una sola lista temporal
  const todasLasCanciones = playlists.flatMap((p) => p.canciones || []);

  if (todasLasCanciones.length === 0) {
    estadisticas.innerHTML = `<p class="mensaje">Agrega canciones para ver estadísticas 📊</p>`;
    return;
  }

  // 1. Cantidad total de canciones
  const cantidad = todasLasCanciones.length;

  // 2. Duración Total sumando los milisegundos y convirtiéndolos a minutos
  const totalMs = todasLasCanciones.reduce((acc, c) => acc + (c.duracion || 0), 0);
  const totalMinutos = Math.floor(totalMs / 60000);

  // 3. Calcula cuál es el artista que más se repite (Artista Principal)
  const conteoArtistas = {};
  todasLasCanciones.forEach((c) => {
    conteoArtistas[c.artista] = (conteoArtistas[c.artista] || 0) + 1;
  });
  const artista = Object.keys(conteoArtistas).reduce((a, b) =>
    conteoArtistas[a] > conteoArtistas[b] ? a : b
  );

  // 4. Calcula cuál es el género musical que más abunda (Género Principal)
  const conteoGeneros = {};
  todasLasCanciones.forEach((c) => {
    if (c.genero) {
      conteoGeneros[c.genero] = (conteoGeneros[c.genero] || 0) + 1;
    }
  });
  const generosKeys = Object.keys(conteoGeneros);
  const genero = generosKeys.length > 0
    ? generosKeys.reduce((a, b) => conteoGeneros[a] > conteoGeneros[b] ? a : b)
    : "N/A";

  // Envía los datos procesados para mostrarlos en pantalla
  mostrarEstadisticas({
    cantidad: `${cantidad}`,
    duracion: `${totalMinutos} min`,
    artista,
    genero
  });
}