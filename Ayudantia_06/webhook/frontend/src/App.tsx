import { useEffect, useState } from "react";

const PROVIDER = "http://localhost:9000";
const CONSUMER = "http://localhost:9001";

type Evento = {
  tipo: string;
  monto: number;
  moneda: string;
  ts: string;
  recibidoEn: string;
};

export function App() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [estado, setEstado] = useState("");

  // A diferencia del WebSocket (push), aqui el front PREGUNTA por polling.
  useEffect(() => {
    const cargar = () =>
      fetch(`${CONSUMER}/events`)
        .then((r) => r.json())
        .then(setEventos)
        .catch(() => {});
    cargar();
    const id = setInterval(cargar, 2000);
    return () => clearInterval(id);
  }, []);

  async function dispararEvento() {
    setEstado("enviando...");
    try {
      await fetch(`${PROVIDER}/pago`, { method: "POST" });
      setEstado("evento disparado; el proveedor notifico al consumidor");
    } catch {
      setEstado("error: el proveedor no respondio");
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "40px auto" }}>
      <h1>Webhook</h1>
      <p>
        Comunicacion server-to-server por evento. Al pulsar el boton, el
        <b> proveedor</b> hace una unica peticion HTTP al <b>consumidor</b>.
        Este frontend ve los eventos consultando por <b>polling</b> (no hay push).
      </p>
      <button onClick={dispararEvento}>Disparar evento "pago.confirmado"</button>
      <p style={{ color: "#666" }}>{estado}</p>

      <h3>Eventos recibidos por el consumidor ({eventos.length})</h3>
      <div style={{ border: "1px solid #ccc", minHeight: 160, padding: 8 }}>
        {eventos.length === 0 && <em>Sin eventos todavia.</em>}
        {eventos.map((e, i) => (
          <pre key={i} style={{ margin: "4px 0", background: "#f6f6f6", padding: 6 }}>
            {JSON.stringify(e, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
}
