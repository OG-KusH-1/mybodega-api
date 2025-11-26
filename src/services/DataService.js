import api from './api.js';

const DataService = {
  async loadInventario() {
    try {
      return await api.get('/products');
    } catch (error) {
      console.error('Error loading inventory:', error);
      return [];
    }
  },

  async addOrUpdateProduct(producto) {
    try {
      // Check if product exists
      const products = await this.loadInventario();
      const existing = products.find(
        (p) => p.nombre.toLowerCase() === producto.nombre.toLowerCase() &&
               p.categoria === producto.categoria
      );

      if (existing) {
        // Update existing
        await api.put(`/products/${existing.id}`, {
          nombre: existing.nombre,
          categoria: existing.categoria,
          cantidad: existing.cantidad + producto.cantidad,
          precio: existing.precio || producto.precio || 0
        });
      } else {
        // Create new
        await api.post('/products', producto);
      }
      return await this.loadInventario();
    } catch (error) {
      console.error('Error adding/updating product:', error);
      throw error;
    }
  },

  async consumeProduct(index) {
    try {
      const products = await this.loadInventario();
      const product = products[index];
      const updatedProduct = {
        nombre: product.nombre,
        categoria: product.categoria,
        cantidad: product.cantidad - 1
      };
      await api.put(`/products/${product.id}`, updatedProduct);
      return await this.loadInventario();
    } catch (error) {
      console.error('Error consuming product:', error);
      throw error;
    }
  },

  async reabastecer(index, cantidad = 1) {
    try {
      const products = await this.loadInventario();
      const product = products[index];
      const updatedProduct = {
        nombre: product.nombre,
        categoria: product.categoria,
        cantidad: product.cantidad + cantidad
      };
      await api.put(`/products/${product.id}`, updatedProduct);
      return await this.loadInventario();
    } catch (error) {
      console.error('Error restocking product:', error);
      throw error;
    }
  },

  async deleteProduct(index) {
    try {
      const products = await this.loadInventario();
      const product = products[index];
      await api.delete(`/products/${product.id}`);
      return await this.loadInventario();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async loadLogs() {
    try {
      return await api.get('/logs');
    } catch (error) {
      console.error('Error loading logs:', error);
      return [];
    }
  },

  // Legacy methods for compatibility (if needed)
  saveInventario() {},
  loadConsumidos() { return {}; },
  saveConsumidos() {},
  saveLogs() {},
  addLog() {},
};

export default DataService;



