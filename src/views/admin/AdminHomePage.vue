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
      <v-tab value="one">Users</v-tab>
      <v-tab value="two">Add Order</v-tab>
      <v-tab value="three">Orders</v-tab>
      <v-tab value="four">Customers</v-tab>
      <v-tab value="five">Company Info</v-tab>
      <v-tab value="six">Map</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <Users />
        </v-window-item>

        <v-window-item value="two">
          <AddTicket />
        </v-window-item>
        <v-window-item value="three">
          <Tickets />
        </v-window-item>

        <v-window-item value="four">
          <Customers />
        </v-window-item>
        <v-window-item value="five">
          <CompanyInfo />
        </v-window-item>
        <v-window-item value="six">
          <Map />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

