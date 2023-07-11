import apiClient from "./services";

export default {
  getTickets() {
    return apiClient.get("tickets");
  },
};
