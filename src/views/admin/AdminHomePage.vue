<script>

import Users from './Users.vue';
import Tickets from './Tickets.vue';
import CompanyInfo from './CompanyInfo.vue';
import Customers from '../clerk/Customers.vue';

export default {
    data: () => ({
        tab: null,
    }),
    components: { Users, Tickets, CompanyInfo, Customers }
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
        <v-tab value="three">Customers</v-tab>
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
            <Customers />
          </v-window-item>
          <v-window-item value="four">
            <CompanyInfo />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>

