<script>

import AddTicket from './AddTicket.vue';

import Couriers from './Couriers.vue';
import Customers from './Customers.vue';
export default {
    data: () => ({
        tab: null,
    }),
    components: { AddTicket, Customers, Couriers }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">Add Ticket</v-tab>
        <v-tab value="two">View Couriers</v-tab>
        <v-tab value="two">View Customers</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <AddTicket />
          </v-window-item>
  
          <v-window-item value="two">
            <Couriers />
          </v-window-item>
          <v-window-item value="three">
            <Customers />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

