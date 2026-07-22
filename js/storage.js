// HU8 - Guardar la información

const CLAVE="mi-setlist";

export function guardar(playlists){
  localStorage.setItem(CLAVE,JSON.stringify(playlists));
}

export function cargar(){

  const datos=localStorage.getItem(CLAVE);

  if(!datos){
    return [];
  }

  try{

    return JSON.parse(datos);

  }catch(error){

    alert("Los datos guardados están dañados. Empezar de nuevo.");

    localStorage.removeItem(CLAVE);

    return [];

  }

}
