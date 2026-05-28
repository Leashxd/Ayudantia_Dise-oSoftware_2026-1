// ============================================================
// EJERCICIO 2A: Consumidor de webhook
// ============================================================
// Objetivo: un servidor que EXPONE una URL para recibir eventos via POST.
// Cuando llega un webhook, lo imprime en la terminal.
//
// Probar:
//   Terminal 1: deno run --allow-net ejercicios/webhook/consumer.ts
//   Terminal 2: curl -X POST http://localhost:9001/webhook \
//                 -H "content-type: application/json" \
//                 -d '{"tipo":"prueba","valor":42}'
// Deberias ver el evento impreso en la Terminal 1.
// ============================================================

Deno.serve({ port: 9001 }, async (req) => {
  const url = new URL(req.url);

  // TODO 1: acepta solo POST en la ruta /webhook.
  //   if (req.method === "POST" && url.pathname === "/webhook") { ... }

  // TODO 2: dentro del if, lee el cuerpo JSON con `await req.json()`,
  //         imprimelo con console.log y responde 200 con "ok".

  // TODO 3: para cualquier otra ruta, responde un texto simple ("Consumer vivo").
  return new Response("TODO: implementar el consumidor", { status: 501 });
});

console.log("Consumidor de webhook en http://localhost:9001");
