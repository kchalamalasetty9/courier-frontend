<script>
import Users from './Users.vue';
import Tickets from '../clerk/Tickets.vue';
import CompanyInfo from './CompanyInfo.vue';
import Customers from '../clerk/Customers.vue';
import AddTicket from '../clerk/AddTicket.vue';
import Map from './Map.vue';

export default {
  data: () => ({
    tab: null,
  }),
  components: { Users, Tickets, CompanyInfo, Customers, Map, AddTicket }
}
</script>
<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="secondary">
      <v-tab to="/admin/users">Users</v-tab>
      <v-tab to="/admin/add-order">Add Order</v-tab>
      <v-tab to="/admin/orders">Orders</v-tab>
      <v-tab to="/admin/customers">Customers</v-tab>
      <v-tab to="/admin/couriers">Couriers</v-tab>
      <v-tab to="/admin/company-info">Company Info</v-tab>
      <v-tab to="/admin/map">Map</v-tab>
    </v-tabs>
    
    <v-card-text>
      <router-view />
    </v-card-text>
  </v-card>
</template>

