import apiClient from "./services";

export default {
  getCouriers() {
    return apiClient.get("couriers");
  },
  deleteCourierById(id) {
    return apiClient.delete(`couriers/${id}`);
  },
  acceptUserRegistration(userId) {
    return apiClient.put(`users/${userId}/accept`)
  },
  declineUserRegistration(userId){
    return apiClient.put(`users/${userId}/decline`)
  },
  getUsers() {
    return apiClient.get("/users");
  },
  editUser(user) {
    return apiClient.put(`users/${user.id}`, user)
  },
  deleteUser(userId) {
    return apiClient.delete(`users/${userId}`)
  },
  getCompanyInfo() {
    return apiClient.get("companies");
  },
  addUser(user) {
    return apiClient.post("users", user);
  },
  addCompany(company){
    return apiClient.post("companies", company);
  },
  editCompany(company){
    return apiClient.put(`companies/${company.key}`, company)
  },
  deleteCompany(companyId){
    return apiClient.delete(`companies/${companyId}`)
  },
  getMap(){
    return apiClient.get('maps')
  }
};
