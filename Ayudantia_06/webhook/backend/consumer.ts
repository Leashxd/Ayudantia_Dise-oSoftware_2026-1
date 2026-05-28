// Consumidor de webhook (Deno).
// Expone una URL publica que RECIBE eventos via POST. Guarda lo recibido en
// memoria y lo ofrece en GET /events para que el frontend lo consulte por
// polling (a diferencia del WebSocket, aqui NO hay push: el front pregunta).

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const eventos: unknown[] = [];

Deno.serve({ port: 9001 }, async (req) => {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  if (req.method === "POST" && url.pathname === "/webhook") {
    const evento = await req.json();
    eventos.push({ ...evento, recibidoEn: new Date().toISOString() });
    console.log("[CONSUMER] webhook recibido:", evento);
    return new Response("ok", { status: 200, headers: cors });
  }

  if (req.method === "GET" && url.pathname === "/events") {
    return new Response(JSON.stringify(eventos), {
      headers: { ...cors, "content-type": "application/json" },
    });
  }

  return new Response("Consumer vivo.", { headers: cors });
});

console.log("Webhook CONSUMER en http://localhost:9001");
