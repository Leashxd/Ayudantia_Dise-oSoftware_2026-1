// Cliente de chat por terminal (YA ESTA COMPLETO, no hay que editarlo).
// Se conecta al servidor del Ejercicio 1 y permite chatear desde la consola.
//
// Uso:  deno run --allow-net ejercicios/websocket/cliente.ts <tu-nombre>

const nombre = Deno.args[0] ?? "anonimo";
const ws = new WebSocket("ws://localhost:8000/ws");

ws.onopen = () => console.log(`[conectado como ${nombre}] escribe y presiona Enter`);
ws.onmessage = (e) => console.log(e.data);
ws.onclose = () => { console.log("[conexion cerrada]"); Deno.exit(0); };
ws.onerror = () => console.error("[no se pudo conectar: esta corriendo el servidor?]");

// Lee linea por linea desde el teclado y la envia por el WebSocket.
const decoder = new TextDecoder();
for await (const chunk of Deno.stdin.readable) {
  const texto = decoder.decode(chunk).trim();
  if (texto && ws.readyState === WebSocket.OPEN) {
    ws.send(`${nombre}: ${texto}`);
  }
}
