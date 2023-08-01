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
    return apiClient.put(`companies/${company.id}`, company)
  },
  deleteCompany(companyId){
    return apiClient.delete(`companies/${companyId}`)
  },
  getMap(){
    return apiClient.get('maps')
  },
  addVertex(vertex){
    return apiClient.post('vertices', vertex);
  },
  addEdge(edge){
    return apiClient.post('edges', edge);
  },
  deleteVertex(name){
    return apiClient.delete(`vertices/${name}`)
  },
  deleteEdge(id){
    return apiClient.delete(`edges/${id}`)
  },
  updateVertex(vertex){
    return apiClient.put(`vertices/${vertex.name}`, vertex)
  },
  updateEdge(edge){
    return apiClient.put(`edges/${edge.id}`, edge)
  },
  getCompanyReport(){
    return apiClient.get('company-report')
  },
  getCourierBonus(courierNumber){
    return apiClient.get(`courier-bonuses/${courierNumber}`)
  }
};
