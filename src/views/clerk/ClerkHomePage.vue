<script>

import AddTicket from './AddTicket.vue';
import Tickets from './Tickets.vue';
import Couriers from './Couriers.vue';
import Customers from './Customers.vue';


export default {
  data: () => ({
    tab: null,
  }),
  components: { AddTicket, Customers, Couriers, Tickets }
}
</script>
<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="secondary">

      <v-tab to="/clerk/add-order">Add Order</v-tab>
      <v-tab to="/clerk/orders">Orders</v-tab>
      <v-tab to="/clerk/customers">Customers</v-tab>
      <v-tab to="/clerk/couriers">Couriers</v-tab>
    </v-tabs>

    <v-card-text>
      <router-view />
    </v-card-text>
  </v-card>
</template>

