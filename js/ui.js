// ==========================================
// UI - Mi Setlist
// Maneja lo que aparece en pantalla
// ==========================================

const resultados = document.querySelector("#resultados");
const listaPlaylists = document.querySelector("#lista-playlists");
const estadisticas = document.querySelector("#estadisticas");


// ==========================================
// HU1 - Buscar canciones
// ==========================================

export function mostrarCarga() {
  resultados.innerHTML = `
    <p class="mensaje">
      ⏳ Buscando canciones...
    </p>
  `;
}

export function mostrarSinResultados(texto) {
  resultados.innerHTML = `
    <p class="mensaje">
      🔎 No encontramos resultados para "${texto}".
    </p>
  `;
}

export function mostrarError() {
  resultados.innerHTML = `
    <p class="mensaje">
      ⚠️ Ocurrió un error al buscar canciones.
    </p>
  `;
}

export function mostrarCanciones(canciones) {
  resultados.innerHTML = "";

  canciones.forEach((cancion) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-cancion";

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

export function mostrarPlaylists(playlists) {
  const contenedor = document.querySelector("#lista-playlists");
  if (!contenedor) return;

  // 1. Si no hay playlists
  if (!playlists || playlists.length === 0) {
    contenedor.innerHTML = `<p class="mensaje">No tienes playlists todavía</p>`;
    return;
  }

  // 2. Limpiar contenido previo
  contenedor.innerHTML = "";

  // 3. Renderizar CADA playlist existente
  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-card");
    playlistDiv.style.marginBottom = "20px";
    playlistDiv.style.border = "1px solid #334155";
    playlistDiv.style.padding = "10px";
    playlistDiv.style.borderRadius = "8px";

    let htmlCanciones = "";

    if (playlist.canciones.length === 0) {
      htmlCanciones = `<p class="mensaje" style="font-size: 0.85rem;">Sin canciones agregadas</p>`;
    } else {
      playlist.canciones.forEach((cancion) => {
        const fecha = cancion.fechaAgregado
          ? new Date(cancion.fechaAgregado).toLocaleDateString()
          : "";

        htmlCanciones += `
          <div class="cancion-item" style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
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
        `;
      });
    }

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

// ✅ ESTA FUNCIÓN FALTABA EXPORTAR PARA CALCULAR LOS DATOS:
export function calcularYMostrarEstadisticas(playlists) {
  if (!estadisticas) return;

  // Unir todas las canciones de todas las playlists
  const todasLasCanciones = playlists.flatMap((p) => p.canciones || []);

  if (todasLasCanciones.length === 0) {
    estadisticas.innerHTML = `<p class="mensaje">Agrega canciones para ver estadísticas 📊</p>`;
    return;
  }

  // 1. Cantidad
  const cantidad = todasLasCanciones.length;

  // 2. Duración Total
  const totalMs = todasLasCanciones.reduce((acc, c) => acc + (c.duracion || 0), 0);
  const totalMinutos = Math.floor(totalMs / 60000);

  // 3. Artista Principal
  const conteoArtistas = {};
  todasLasCanciones.forEach((c) => {
    conteoArtistas[c.artista] = (conteoArtistas[c.artista] || 0) + 1;
  });
  const artista = Object.keys(conteoArtistas).reduce((a, b) =>
    conteoArtistas[a] > conteoArtistas[b] ? a : b
  );

  // 4. Género Principal
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

  // Mostrar en pantalla
  mostrarEstadisticas({
    cantidad: `${cantidad}`,
    duracion: `${totalMinutos} min`,
    artista,
    genero
  });
}