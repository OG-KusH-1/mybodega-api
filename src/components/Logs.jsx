import { useEffect, useState } from "react";
import api from "../services/api";

function Logs() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/movements");
      setMovements(res.data);
    } catch (err) {
      console.error("Error cargando movimientos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 20_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>📚 Movimientos</h1>

      {loading ? <p>Cargando...</p> : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(m => (
              <tr key={m.id}>
                <td>{m.productName}</td>
                <td>{m.type}</td>
                <td>{m.quantity}</td>
                <td>{new Date(m.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Logs;
