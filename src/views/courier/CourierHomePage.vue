<script>

import MyTickets from './MyTickets.vue';
export default {
    data: () => ({
        tab: null,
    }),
    components: { MyTickets }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab to="/courier/my-orders">My Orders</v-tab>
        <v-tab to="/courier/available-orders">Available Orders</v-tab>
      </v-tabs>
  
      <v-card-text>
        <router-view />
      </v-card-text>
    </v-card>
  </template>