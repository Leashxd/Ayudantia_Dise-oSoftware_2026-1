# Demo: WebSocket vs Webhook

Cada mecanismo tiene su **backend en Deno** y su **frontend en React (Vite)**.

```
websocket/
  backend/server.ts      # Deno: conexiones + broadcast
  frontend/              # React: cliente WebSocket
webhook/
  backend/provider.ts    # Deno: emite el evento -> POST al consumidor
  backend/consumer.ts    # Deno: recibe el webhook y lo expone en /events
  frontend/              # React: dispara evento y ve resultados por polling
```

## Requisitos

- [Deno](https://deno.com) (backends)
- [Node.js](https://nodejs.org) + npm (frontends React/Vite)

## Instalacion

Instala las dependencias de cada frontend una sola vez:

```bash
npm --prefix websocket/frontend install
npm --prefix webhook/frontend install
```

## WebSocket

Conexion **persistente y bidireccional**. El backend mantiene todas las
conexiones y hace **broadcast**: lo que escribes en una pestaña aparece en todas.

```bash
# Terminal 1: backend
deno run --allow-net websocket/backend/server.ts
# Terminal 2: frontend
npm --prefix websocket/frontend run dev   # http://localhost:5173
```

Abre dos pestañas en http://localhost:5173 y escribe: el mensaje aparece en ambas.

## Webhook

Comunicacion **server-to-server**, una peticion HTTP por evento. No hay conexion
abierta; el frontend ve los eventos por **polling**.

```bash
# Terminal 1: consumidor (recibe el webhook)
deno run --allow-net webhook/backend/consumer.ts
# Terminal 2: proveedor (emite el evento)
deno run --allow-net webhook/backend/provider.ts
# Terminal 3: frontend
npm --prefix webhook/frontend run dev     # http://localhost:5174
```

En http://localhost:5174 pulsa el boton: el proveedor notifica al consumidor y
los eventos aparecen en la lista.

## Diferencias clave

| Aspecto      | WebSocket                          | Webhook                              |
|--------------|------------------------------------|--------------------------------------|
| Conexion     | Persistente (abierta)              | Efimera (un HTTP por evento)         |
| Direccion    | Bidireccional (cliente ↔ servidor) | Unidireccional (server → server)     |
| Quien recibe | Navegador / app (push)             | Otro backend con URL publica         |
| Front se entera | Push del servidor               | Polling al consumidor                |
| Protocolo    | ws:// (upgrade desde HTTP)         | HTTP/HTTPS normal                    |
| Uso tipico   | Chat, tiempo real, streaming       | Notificaciones de eventos (pagos)    |

## Nota sobre websocket

Existen dos modos, el websocket no necesariamente implica realizar un broadcast a todos, esta es una de las opciones. De ello, tambien podriamos realizar un websocket 1 a 1, lo cual quiere decir que se podria tener una conversacion privada con otro usuario.

En caso de tener un websocket 1 a 1 se utiliza `socket.send(mensaje, id_usuario)`
