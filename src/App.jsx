import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import InventoryTable from "./components/InventoryTable";
import Reports from "./components/Reports";
import Login from "./components/Login";
import ShoppingList from "./components/ShoppingList";
import Logs from "./components/Logs";
import Register from "./components/Registro";
import ProtectedRoute from "./components/ProtectedRoute";

import ProductService from "./services/ProductService";
import AuthService from "./services/AuthService";

export default function App() {
  const [inventario, setInventario] = useState([]);

  // Cargar inventario al iniciar si hay token
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      fetchInventario();
    }
  }, []);

  const fetchInventario = async () => {
    try {
      const data = await ProductService.getAll();
      setInventario(data);
    } catch (err) {
      console.error("Error cargando inventario:", err);
    }
  };

  const handleLogin = () => {
    fetchInventario();
  };

  const handleLogout = () => {
    AuthService.logout();
    setInventario([]);
  };

  // CRUD usando IDs, asegurando que React re-renderice
  const handleAdd = async (producto) => {
    const res = await ProductService.create(producto);
    setInventario(prev => [...prev, res]);
  };

  const handleEdit = async (id, datos) => {
    const res = await ProductService.update(id, datos);
    setInventario(prev => prev.map(p => p.id === id ? res : p));
  };

  const handleDelete = async (id) => {
    await ProductService.delete(id);
    setInventario(prev => prev.filter(p => p.id !== id));
  };

  const handleConsume = async (id) => {
    const producto = inventario.find(p => p.id === id);
    if (!producto || producto.cantidad <= 0) return;
    handleEdit(id, { ...producto, cantidad: producto.cantidad - 1 });
  };

  const handleReabastecer = async (id) => {
    const producto = inventario.find(p => p.id === id);
    if (!producto) return;
    handleEdit(id, { ...producto, cantidad: producto.cantidad + 1 });
  };

  return (
    <>
      {AuthService.isAuthenticated() && <Header onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <ProductForm onAdd={handleAdd} />
                </div>
                <div className="col-md-8">
                  <h2>Inventario</h2>
                  <InventoryTable
                    inventario={inventario}
                    onConsume={handleConsume}
                    onReabastecer={handleReabastecer}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }/>

        <Route path="/reportes" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/compras" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
