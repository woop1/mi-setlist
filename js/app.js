import { buscarCanciones } from "./api.js";
import {
  mostrarCanciones,
  mostrarCarga,
  mostrarSinResultados,
  mostrarError
} from "./ui.js";

const formulario = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");


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

  } catch (error) {

    mostrarError();

    console.error(error);

  }

});
