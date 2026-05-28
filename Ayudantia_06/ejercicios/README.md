# Ejercicios: WebSocket y Webhook (solo terminal)

Sin frontend. Levantan los servidores con Deno y los prueban desde la consola.
Cada archivo tiene comentarios `TODO` para completar. Las respuestas estan en
`soluciones/` (para el profesor).

Requisito: tener [Deno](https://deno.com) instalado (`deno --version`).

---

## Ejercicio 1 — Chat con WebSocket

Archivo a completar: [websocket/server.ts](websocket/server.ts)
Cliente de prueba (ya hecho): [websocket/cliente.ts](websocket/cliente.ts)

**Meta:** que varios clientes de terminal chateen entre si. Lo que escribe uno
debe verse en todos (broadcast).

**Pasos:**
1. Completa los 4 `TODO` del servidor.
2. Levanta el servidor:
   ```bash
   deno run --allow-net websocket/server.ts
   ```
3. En otras terminales, conecta clientes:
   ```bash
   deno run --allow-net websocket/cliente.ts Ana
   deno run --allow-net websocket/cliente.ts Beto
   ```
4. Escribe en la terminal de Ana: debe aparecer tambien en la de Beto.

**Te funciona si:** un mensaje escrito por un cliente lo reciben TODOS.

**Retos extra:**
- Que el servidor avise "Ana se conecto" / "Ana se desconecto".
- Comandos: si el mensaje es `/hora`, que el servidor responda solo a ese cliente.
- Limitar el chat a las ultimas N personas y rechazar conexiones extra.

---

## Ejercicio 2 — Webhook (proveedor + consumidor)

Archivos a completar:
- [webhook/consumer.ts](webhook/consumer.ts) (recibe el evento)
- [webhook/provider.ts](webhook/provider.ts) (emite el evento)

**Meta:** el proveedor, ante un evento, avisa al consumidor con una sola
peticion HTTP (no hay conexion persistente).

**Pasos:**
1. Completa los `TODO` del consumidor y prueba que recibe:
   ```bash
   deno run --allow-net webhook/consumer.ts
   # en otra terminal:
   curl -X POST http://localhost:9001/webhook \
     -H "content-type: application/json" -d '{"tipo":"prueba","valor":42}'
   ```
2. Completa los `TODO` del proveedor.
3. Levanta los dos y dispara el evento:
   ```bash
   deno run --allow-net webhook/consumer.ts      # terminal 1
   deno run --allow-net webhook/provider.ts      # terminal 2
   curl -X POST http://localhost:9000/pago       # terminal 3
   ```

**Te funciona si:** al hacer POST a `/pago`, el evento aparece impreso en la
terminal del consumidor.

**Retos extra:**
- El consumidor guarda los eventos en una lista y la expone en `GET /events`.
- El proveedor reintenta si el consumidor no responde (status != 200).
- Firma simple: el proveedor manda un header `x-secret` y el consumidor rechaza
  con 401 si no coincide.

---

## Pregunta para discutir en clase

¿Por que en el WebSocket el servidor puede "empujar" mensajes cuando quiera, y
en el webhook hace falta que el proveedor inicie una peticion HTTP cada vez?

> Pista: una conexion sigue abierta; la otra se abre y se cierra por evento.

## Soluciones (profesor)

```bash
deno run --allow-net soluciones/websocket_server.ts
deno run --allow-net soluciones/webhook_consumer.ts
deno run --allow-net soluciones/webhook_provider.ts
```
