// ==========================================
// UI - Mi Setlist
// Maneja lo que aparece en pantalla
// ==========================================

const resultados = document.querySelector("#resultados");
const listaPlaylists = document.querySelector("#lista-playlists");
const estadisticas = document.querySelector("#estadisticas");

let cancionesMostradas = [];


// ==========================================
// HU1 - Buscar canciones
// ==========================================

export function mostrarCarga() {
  resultados.innerHTML = `
    <p class="mensaje">⏳ Buscando canciones...</p>
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
  cancionesMostradas = canciones;


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

        <button class="btn-agregar" data-cancion='${JSON.stringify(cancion)}'>
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

  return `${minutos}:${resto.toString().padStart(2,"0")}`;

}


// ==========================================
// HU4 - Ver playlist
// HU5 - Eliminar canciones
// HU6 - Eliminar playlist
// ==========================================

export function mostrarPlaylists(playlists){
  listaPlaylists.innerHTML="";

  playlists.forEach((playlist)=>{

    const elemento=document.createElement("article");

    elemento.className="playlist";

    elemento.innerHTML=`
      <h3>🎵 ${playlist.nombre}</h3>
      <p>${playlist.canciones.length} canciones</p>

      <div class="canciones-playlist">

        ${
          playlist.canciones.length === 0
          ? `<p>No hay canciones todavía 🎧</p>`
          :
          playlist.canciones.map((cancion)=>`

            <div class="cancion-playlist">

              <img 
                src="${cancion.imagen}" 
                width="60"
                alt="${cancion.nombre}"
              >

              <p>
                🎵 ${cancion.nombre}
              </p>

              <p>
                👤 ${cancion.artista}
              </p>

              <small>
                📅 Agregada:
                ${new Date(cancion.fechaAgregado).toLocaleDateString()}
              </small>

            </div>

          `).join("")
        }

      </div>
    `;

    listaPlaylists.appendChild(elemento);

  });
}


// ==========================================
// Botón agregar canción
// ==========================================

// ==========================================
// HU3 - Agregar canciones
// Envía la canción completa al app.js
// ==========================================

export function activarBotonesAgregar(callback){
  const botones=document.querySelectorAll(".btn-agregar");

  botones.forEach((boton)=>{
    boton.addEventListener("click",()=>{

      const cancion=JSON.parse(boton.dataset.cancion);

      callback(cancion);

    });
  });
}




// ==========================================
// HU5 - Botón eliminar canción
// ==========================================

export function activarBotonesEliminarCancion(callback) {

  const botones =
  document.querySelectorAll(".btn-eliminar-cancion");


  botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

      callback(
        boton.dataset.playlist,
        boton.dataset.cancion
      );

    });

  });

}


// ==========================================
// HU6 - Botón eliminar playlist
// ==========================================

export function activarBotonesEliminarPlaylist(callback) {

  const botones =
  document.querySelectorAll(".btn-eliminar-playlist");


  botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

      callback(
        boton.dataset.id
      );

    });

  });

}


// ==========================================
// HU7 - Estadísticas
// ==========================================

export function mostrarEstadisticas(datos) {

  if (!estadisticas) return;


  estadisticas.innerHTML = `

    <p>
    🎵 Canciones:
    ${datos.cantidad}
    </p>

    <p>
    ⏱ Duración:
    ${datos.duracion}
    </p>

    <p>
    👤 Artista principal:
    ${datos.artista}
    </p>

    <p>
    🎸 Género:
    ${datos.genero}
    </p>

  `;

}
