import apiClient from "./services";

export default {
  getTickets() {
    const userId = JSON.parse(localStorage.getItem("user")).id || 0
    return apiClient.get(`/couriers/${userId}/tickets`);
  },
  getAvaliableTickets() {
    const userId = JSON.parse(localStorage.getItem("user")).id || 0
    return apiClient.get(`/couriers/${userId}/available-tickets`);
  },
};
