<script>

import AddTicket from './AddTicket.vue';

import ViewCustomers from './ViewCustomers.vue';
export default {
    data: () => ({
        tab: null,
    }),
    components: { AddTicket, ViewCustomers, }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">Add Ticket</v-tab>
        <v-tab value="two">View Customers</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <AddTicket />
          </v-window-item>
  
          <v-window-item value="two">
            <ViewCustomers />
          </v-window-item>
          <v-window-item value="four">
            <Clerks />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

