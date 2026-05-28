// ============================================================
// EJERCICIO 1: Servidor de chat con WebSocket
// ============================================================
// Objetivo: levantar un servidor WebSocket que funcione como chat grupal.
// Todo lo que escriba un cliente debe reenviarse a TODOS los conectados.
//
// Probar con el cliente de terminal incluido:
//   Terminal 1:  deno run --allow-net ejercicios/websocket/server.ts
//   Terminal 2:  deno run --allow-net ejercicios/websocket/cliente.ts Ana
//   Terminal 3:  deno run --allow-net ejercicios/websocket/cliente.ts Beto
// Escribe en una terminal y deberia aparecer en la otra.
// ============================================================

// Aqui guardaremos todas las conexiones abiertas.
const clientes = new Set<WebSocket>();

// TODO 3: implementa el broadcast.
// Debe recorrer `clientes` y enviar `mensaje` a cada socket que siga abierto
// (revisa ws.readyState === WebSocket.OPEN).
function broadcast(mensaje: string) {
  // ...
}

Deno.serve({ port: 8000 }, (req) => {
  // Solo aceptamos WebSocket en la ruta /ws
  if (new URL(req.url).pathname !== "/ws") {
    return new Response("Servidor de chat. Conecta a ws://localhost:8000/ws");
  }

  // TODO 1: haz el upgrade de la peticion a WebSocket.
  //   const { socket, response } = Deno.upgradeWebSocket(req);

  // TODO 2: registra los eventos del socket:
  //   - onopen:    agrega el socket a `clientes` y avisa por broadcast que entro alguien.
  //   - onmessage: reenvia el mensaje recibido a todos con broadcast.
  //   - onclose:   quita el socket de `clientes` y avisa que alguien salio.

  // TODO 4: devuelve `response` para completar el handshake.
  return new Response("TODO: implementar el WebSocket", { status: 501 });
});

console.log("Servidor de chat en ws://localhost:8000/ws");
