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
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">Add Order</v-tab>
        <v-tab value="two">Orders</v-tab>
        <v-tab value="three">View Couriers</v-tab>
        <v-tab value="four">View Customers</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <AddTicket />
          </v-window-item>
  
          <v-window-item value="two">
            <Tickets />
          </v-window-item>
          <v-window-item value="three">
            <Couriers />
          </v-window-item>
          <v-window-item value="four">
            <Customers />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

