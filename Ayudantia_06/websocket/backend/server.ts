// Backend WebSocket (Deno).
// Mantiene TODAS las conexiones abiertas y hace broadcast: cuando un cliente
// envia un mensaje, se reenvia a todas las pestañas conectadas. Por eso ahora
// si escribes en una pestaña, aparece tambien en las demas.

const clientes = new Set<WebSocket>();
const historial: string[] = [];

function broadcast(mensaje: string) {
  historial.push(mensaje);
  for (const ws of clientes) {
    if (ws.readyState === WebSocket.OPEN) ws.send(mensaje);
  }
}

Deno.serve({ port: 8000 }, (req) => {
  if (new URL(req.url).pathname !== "/ws") {
    return new Response("Backend WebSocket. Conectar a ws://localhost:8000/ws");
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    clientes.add(socket);
    console.log(`[WS] cliente conectado (total: ${clientes.size})`);
    // Replay: la pestaña nueva recibe el historial existente.
    for (const m of historial) socket.send(m);
    broadcast(`Servidor: un cliente se conecto (hay ${clientes.size})`);
  };

  socket.onmessage = (e) => {
    console.log("[WS] mensaje:", e.data);
    broadcast(`Cliente: ${e.data}`); // se reenvia a TODOS
  };

  socket.onclose = () => {
    clientes.delete(socket);
    console.log(`[WS] cliente desconectado (total: ${clientes.size})`);
  };

  return response;
});

console.log("Backend WebSocket en http://localhost:8000");
