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

        <button>
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
    `;

    listaPlaylists.appendChild(elemento);

  });

}
