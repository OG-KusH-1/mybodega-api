import { useEffect, useState } from "react";
import api from "../services/api";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/shopping");
      setItems(res.data); // lista de productos con cantidad <= 3
    } catch (err) {
      console.error("Error cargando lista de compras:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // opcional: refrescar cada cierto tiempo
    const interval = setInterval(load, 30_000); // 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🛒 Lista de Compras (Productos con ≤ 3 unidades)</h1>

      {loading ? <p>Cargando...</p> : (
        <>
          {items.length === 0 ? <p>No hay productos en bajo stock.</p> :
            <ul>
              {items.map(p => (
                <li key={p.id}>
                  {p.nombre} — <strong>{p.cantidad}</strong>
                </li>
              ))}
            </ul>
          }
        </>
      )}
    </div>
  );
}

export default ShoppingList;
