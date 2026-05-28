import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:8000/ws";

export function App() {
  const [mensajes, setMensajes] = useState<string[]>([]);
  const [texto, setTexto] = useState("");
  const [conectado, setConectado] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => setConectado(true);
    ws.onclose = () => setConectado(false);
    ws.onmessage = (e) => setMensajes((prev) => [...prev, e.data]);
    return () => ws.close();
  }, []);

  function enviar() {
    if (texto && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(texto); // el backend hace broadcast a TODAS las pestañas
      setTexto("");
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "40px auto" }}>
      <h1>WebSocket {conectado ? "Conectado" : "Desconectado"}</h1>
      <p>
        Conexion persistente y bidireccional. Abre <b>dos pestañas</b>: lo que
        escribas en una aparece en ambas porque el servidor hace broadcast.
      </p>
      <div style={{ border: "1px solid #ccc", height: 240, overflowY: "auto", padding: 8 }}>
        {mensajes.map((m, i) => (
          <div key={i} style={{ color: m.startsWith("Servidor") ? "#0a7" : "#06c" }}>
            {m}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Escribe y Enter"
          style={{ flex: 1 }}
        />
        <button onClick={enviar}>Enviar</button>
      </div>
    </div>
  );
}
