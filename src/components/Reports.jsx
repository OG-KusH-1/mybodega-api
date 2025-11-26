import { useEffect, useState } from "react";
import api from "../services/api"; // ajusta ruta si tu api.js está en services/api.js

function Reports() {
  const [byCategory, setByCategory] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      const resCategory = await api.get("/api/reports/by-category");
      const resLowStock = await api.get("/api/reports/low-stock");

      setByCategory(resCategory.data); // [{category, count}, ...]
      setLowStock(resLowStock.data); // [{id, nombre, cantidad}, ...]
    } catch (err) {
      console.error("Error cargando reportes:", err);
      setError("No se pudieron cargar los reportes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) return <p>Cargando reportes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h1>📊 Reportes</h1>

      <section>
        <h2>Productos por Categoría</h2>
        <table>
          <thead>
            <tr><th>Categoría</th><th>Total</th></tr>
          </thead>
          <tbody>
            {byCategory.map((c, idx) => (
              <tr key={idx}>
                <td>{c.category}</td>
                <td>{c.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Productos con Bajo Stock (≤ 3)</h2>
        <table>
          <thead>
            <tr><th>Producto</th><th>Cantidad</th></tr>
          </thead>
          <tbody>
            {lowStock.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td style={{ color: "red" }}>{p.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Reports;
