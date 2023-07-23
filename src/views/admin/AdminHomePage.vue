<script>

import Users from './Users.vue';
import Couriers from './Couriers.vue';
import Tickets from './Tickets.vue';
import CompanyInfo from './CompanyInfo.vue';

export default {
    data: () => ({
        tab: null,
    }),
    components: { Users, Couriers, Tickets, CompanyInfo }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">Users</v-tab>
        <v-tab value="two">Orders</v-tab>
        <v-tab value="three">Couriers</v-tab>
        <v-tab value="four">Company Info</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <Users />
          </v-window-item>
  
          <v-window-item value="two">
            <Tickets />
          </v-window-item>
          <v-window-item value="three">
            <Couriers />
          </v-window-item>
          <v-window-item value="four">
            <CompanyInfo />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

