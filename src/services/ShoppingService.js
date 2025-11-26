import api from "./api";

const ShoppingService = {
  getAll: () => api.get("/shopping"),
  add: (item) => api.post("/shopping", item),
  delete: (id) => api.delete(`/shopping/${id}`),
};

export default ShoppingService;
