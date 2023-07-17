<script>

import UserRegistrationScreen from './UserRegistration.vue';
import Couriers from './Couriers.vue';
import Tickets from './Tickets.vue';
import CompanyInfo from './CompanyInfo.vue';

export default {
    data: () => ({
        tab: null,
    }),
    components: { UserRegistrationScreen, Couriers, Tickets, CompanyInfo }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">User Registrations</v-tab>
        <v-tab value="two">Tickets</v-tab>
        <v-tab value="three">Couriers</v-tab>
        <v-tab value="four">Company Info</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <UserRegistrationScreen />
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

