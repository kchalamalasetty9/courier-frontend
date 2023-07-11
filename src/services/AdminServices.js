import apiClient from "./services";

export default {
  getCouriers() {
    return apiClient.get("couriers");
  },
  getClerks() {
    return apiClient.get("clerks");
  },
  getTickets() {
    return apiClient.get("tickets");
  },
  acceptUserRegistration(userId) {
    return apiClient.put(`user-registrations/${userId}/accept`)
  },
  declineUserRegistration(userId){
    return apiClient.put(`user-registrations/${userId}/decline`)
  }
};
