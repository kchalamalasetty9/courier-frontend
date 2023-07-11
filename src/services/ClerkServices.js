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
};
