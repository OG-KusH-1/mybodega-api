import api from "./api";

const ReportService = {
  byCategory: () => api.get("/reports/by-category"),
  lowStock: () => api.get("/reports/low-stock"),
};

export default ReportService;
