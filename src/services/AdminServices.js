import apiClient from "./services";

export default {
  getCouriers() {
    return apiClient.get("couriers");
  },
  deleteCourierById(id) {
    return apiClient.delete(`couriers/${id}`);
  },
  getTickets() {
    return apiClient.get("tickets");
  },
  acceptUserRegistration(userId) {
    return apiClient.put(`users/${userId}/accept`)
  },
  declineUserRegistration(userId){
    return apiClient.put(`users/${userId}/decline`)
  },
  getUsers() {
    return apiClient.get("/users/pending");
  },
  getCompanyInfo() {
    return apiClient.get("companies");
  }
};
