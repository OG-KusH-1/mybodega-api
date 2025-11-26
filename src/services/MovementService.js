import api from "./api";

const MovementService = {
  getAll: () => api.get("/movements"),
  create: (data) => api.post("/movements", data),
};

export default MovementService;
