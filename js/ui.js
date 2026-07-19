const resultados = document.querySelector("#resultados");

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
  resultados.innerHTML = "";

  canciones.forEach((cancion) => {
    const tarjeta = document.createElement("article");

    tarjeta.className = "tarjeta-cancion";

    tarjeta.innerHTML = `
      <img 
        src="${cancion.imagen}" 
        alt="Carátula de ${cancion.nombre}"
      >

      <div>
        <h3>${cancion.nombre}</h3>
        <p>${cancion.artista}</p>
        <p>${formatearDuracion(cancion.duracion)}</p>

        <button class="btn-agregar" data-id="${cancion.id}">
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
  const restoSegundos = segundos % 60;

  return `${minutos}:${restoSegundos
    .toString()
    .padStart(2, "0")}`;
}

const listaPlaylists = document.querySelector("#lista-playlists");

export function mostrarPlaylists(playlists) {

  listaPlaylists.innerHTML = "";

  playlists.forEach((playlist) => {

    const elemento = document.createElement("article");

    elemento.className = "playlist";

    elemento.innerHTML = `
      <h3>🎵 ${playlist.nombre}</h3>
      <p>${playlist.canciones.length} canciones</p>

<div class="canciones-playlist">
  ${
    playlist.canciones.map(cancion => `
      <div>
        <p>🎵 Canción agregada</p>
        <small>
          Agregada:
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

export function activarBotonesAgregar(callback) {

  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {

    boton.addEventListener("click", () => {

      const id = boton.dataset.id;

      callback(id);

    });

  });

}
