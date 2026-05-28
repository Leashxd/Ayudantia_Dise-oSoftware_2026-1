// Proveedor de webhook (Deno).
// Cuando ocurre un evento (POST /pago, disparado desde el frontend) hace UNA
// peticion HTTP a la URL del consumidor. No mantiene conexion abierta.

const WEBHOOK_URL = "http://localhost:9001/webhook";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

Deno.serve({ port: 9000 }, async (req) => {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  if (req.method === "POST" && url.pathname === "/pago") {
    const evento = {
      tipo: "pago.confirmado",
      monto: 1990,
      moneda: "CLP",
      ts: new Date().toISOString(),
    };

    console.log("[PROVIDER] evento ocurrido, notificando webhook...");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(evento),
      });
      console.log("[PROVIDER] consumidor respondio:", res.status);
      return new Response(JSON.stringify({ enviado: true, evento }), {
        headers: { ...cors, "content-type": "application/json" },
      });
    } catch (err) {
      console.error("[PROVIDER] no se pudo entregar el webhook:", err);
      return new Response(JSON.stringify({ enviado: false }), {
        status: 502,
        headers: { ...cors, "content-type": "application/json" },
      });
    }
  }

  return new Response("Provider vivo.", { headers: cors });
});

console.log("Webhook PROVIDER en http://localhost:9000");
