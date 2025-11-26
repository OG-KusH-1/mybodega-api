import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !cantidad || !categoria) return;

    // Obtener token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay token, inicia sesión nuevamente.");
      return;
    }

    const nuevoProducto = {
      nombre,
      cantidad: parseInt(cantidad),
      categoria
    };

    try {
      const resp = await fetch("http://localhost:8090/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (!resp.ok) {
        throw new Error("Error al agregar el producto");
      }

      const data = await resp.json();

      // Avisar al padre que lo agregue a la lista
      if (onAdd) onAdd(data);

      // Limpiar formulario
      setNombre("");
      setCantidad("");
      setCategoria("");

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo agregar el producto.");
    }
  };

  return (
    <form className="card p-3 mb-3" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="nombre" className="form-label">
          Producto
        </label>
        <input
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="cantidad" className="form-label">
          Cantidad
        </label>
        <input
          id="cantidad"
          type="number"
          className="form-control"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="categoria" className="form-label">
          Categoría
        </label>
        <select
          id="categoria"
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      <button className="btn btn-success" type="submit">
        Agregar
      </button>
    </form>
  );
}

export default ProductForm;
