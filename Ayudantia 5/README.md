# Ayudantia 5 V2

Proyecto base para practicar una arquitectura simple separada en **frontend** y **backend** usando Deno.

## Contenidos vistos

- Estructuracion por capas: `frontend/` y `backend/`.
- Backend basico en Deno con `Deno.serve`.
- API REST simple: `GET /api/students`.
- Uso de **handler** para encapsular la logica de una ruta.
- Frontend con React + Vite (JSX) y CSS puro.
- Orquestacion de tareas con `deno task`.

## Estructura del proyecto

```text
.
├── backend/
│   ├── data.json
│   └── server.ts
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   └── user-icon.svg
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── api/
│       │   └── studentsApi.js
│       └── components/
│           └── PlantCard.jsx
└── deno.json
```

## API

- Metodo: `GET`
- Ruta: `/api/students`
- Origen de datos: `backend/data.json`
- Cliente frontend: `frontend/src/api/studentsApi.js`

## Handler (que hace)

En `backend/server.ts`, el handler `studentsHandler()`:

1. Lee el archivo `data.json`.
2. Devuelve el contenido como `application/json`.
3. Agrega cabecera CORS (`access-control-allow-origin: *`).

## Flujo Frontend -> Backend

1. `App.jsx` llama `getStudents()`.
2. `getStudents()` (en `src/api/studentsApi.js`) hace `fetch` a `/api/students`.
3. El backend responde con los datos de `data.json`.
4. El frontend renderiza las tarjetas.

## Tareas (Deno)

Definidas en `deno.json`:

- `deno task api`: levanta backend en puerto 8000.
- `deno task web`: levanta frontend con Vite en puerto 5173.
- `deno task dev`: ejecuta backend + frontend.

## Ejecucion

```bash
deno task dev
```

Abrir:

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:8000/api/students](http://localhost:8000/api/students)
