import apiClient from "./services";

export default {
  createCustomer(customer) {
    return apiClient.post("customers", customer);
  },
  getCustomers() {
    return apiClient.get("customers");
  },
  getCouriers() {
    return apiClient.get("couriers");
  },
  editCustomer(customer){
    return apiClient.put(`customers/${customer.customerNumber}`, customer);
  },
  deleteCustomer(customerId){
    return apiClient.delete(`customers/${customerId}`);
  },
  getAvailableCouriers() {
    return apiClient.get("available-couriers");
  },
  createTicket(ticket) {
    return apiClient.post("tickets", ticket);
  },
  getTickets() {
    return apiClient.get("tickets");
  },
  deleteTicket(ticketId){
    return apiClient.delete(`tickets/${ticketId}`);
  },
  editTicket(ticket){
    return apiClient.put(`tickets/${ticket.ticketId}`, ticket);
  },
  ticketEstimates(source, destination){
    return apiClient.get(`getEstimates?sourceNode=${source}&destinationNode=${destination}`)
  },
  updateTicketStatus(ticket) { // only cancelled
    return apiClient.put(`tickets/${ticket.ticketId}/update-status`, ticket);
  },
};
