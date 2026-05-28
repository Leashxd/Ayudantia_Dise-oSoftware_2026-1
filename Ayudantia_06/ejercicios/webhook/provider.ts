// ============================================================
// EJERCICIO 2B: Proveedor de webhook
// ============================================================
// Objetivo: cuando ocurre un evento (aqui lo simulamos con POST /pago),
// el proveedor hace UNA peticion HTTP al consumidor para avisarle.
//
// Probar (necesitas el consumidor del 2A corriendo):
//   Terminal 1: deno run --allow-net ejercicios/webhook/consumer.ts
//   Terminal 2: deno run --allow-net ejercicios/webhook/provider.ts
//   Terminal 3: curl -X POST http://localhost:9000/pago
// El evento debe aparecer en la terminal del consumidor.
// ============================================================

const WEBHOOK_URL = "http://localhost:9001/webhook";

Deno.serve({ port: 9000 }, async (req) => {
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/pago") {
    const evento = {
      tipo: "pago.confirmado",
      monto: 1990,
      ts: new Date().toISOString(),
    };

    // TODO 1: notifica al consumidor enviando `evento` con fetch().
    //   - metodo POST
    //   - header content-type: application/json
    //   - body: JSON.stringify(evento)
    // Usa await y guarda la respuesta para ver el status.

    // TODO 2: imprime en consola el status que devolvio el consumidor.

    return new Response("evento procesado\n");
  }

  return new Response("Proveedor vivo. Dispara con: curl -X POST http://localhost:9000/pago\n");
});

console.log("Proveedor de webhook en http://localhost:9000");
