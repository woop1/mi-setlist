// HU8 - Guardar la información

// Constante que sirve como la "llave" o identificador único para guardar y buscar los datos en la memoria del navegador (localStorage)
const CLAVE="mi-setlist";

// Función para guardar (guardar y persistir) la lista de playlists en el navegador
export function guardar(playlists){
  localStorage.setItem(CLAVE,JSON.stringify(playlists)); // Convierte el arreglo/objeto de playlists a texto plano (JSON) para que el navegador pueda almacenarlo
}

// Función para cargar y recuperar las playlists guardadas previamente en el navegador
export function cargar(){

  const datos=localStorage.getItem(CLAVE); // Busca los datos en el localStorage usando nuestra clave

  // Si no hay ningún dato guardado todavía, devuelve un arreglo vacío para empezar a trabajar
  if(!datos){
    return [];
  }

  // Intenta convertir el texto recuperado de vuelta a un formato utilizable por JavaScript (objetos y arreglos)
  try{

    return JSON.parse(datos);

  // Si ocurre un error al leer los datos (porque están corruptos o malformados), avisa al usuario, limpia el espacio y retorna un arreglo vacío
  }catch(error){

    alert("Los datos guardados están dañados. Empezar de nuevo.");

    localStorage.removeItem(CLAVE); // Borra los datos dañados de la memoria

    return [];

  }

}