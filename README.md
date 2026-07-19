# 🎵 Mi Setlist

Aplicación web que permite buscar canciones usando la API de iTunes, crear playlists personales y organizar música que permanece guardada en el navegador.

## 🚀 Stack utilizado

- HTML5
- CSS3
- JavaScript Vanilla con módulos ESM
- iTunes Search API
- LocalStorage para persistencia de datos
- GitHub Pages para despliegue

## 📖 Historias de Usuario

Las historias de usuario del proyecto se encuentran en:

[HISTORIA.md](HISTORIA.md)

Principales funcionalidades:

- Buscar canciones por nombre o artista.
- Mostrar información de canciones.
- Crear playlists personalizadas.
- Agregar canciones a playlists.
- Ver canciones dentro de una playlist.
- Eliminar canciones.
- Eliminar playlists.
- Mostrar estadísticas de música.
- Guardar playlists al recargar la página.

## 💻 Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

```bash
git clone https://github.com/woop1/mi-setlist.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd mi-setlist
```

3. Abrir el proyecto usando un servidor local.

Se recomienda utilizar la extensión **Live Server** de Visual Studio Code.

4. Abrir:

```
index.html
```

La aplicación debe ejecutarse desde un servidor local porque utiliza módulos JavaScript ESM.

## 🧠 Arquitectura

El proyecto está organizado utilizando módulos JavaScript:

- `app.js`: punto de entrada de la aplicación.
- `api.js`: comunicación con la API de iTunes.
- `state.js`: manejo del estado central.
- `storage.js`: guardado y recuperación con LocalStorage.
- `ui.js`: renderizado y eventos de la interfaz.
- `models/Cancion.js`: modelo de datos de una canción.

## 🤖 Uso de IA

La IA fue utilizada como herramienta de apoyo para:

- Planificación de historias de usuario.
- Revisión de decisiones técnicas.
- Apoyo durante la implementación.

Los prompts utilizados se encuentran registrados en:

[PROMPTS.md](PROMPTS.md)

## 📌 Estado del proyecto

Proyecto final del curso Code 201.