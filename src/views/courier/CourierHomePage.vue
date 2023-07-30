<script>

import ViewTickets from './ViewTickets.vue';
export default {
    data: () => ({
        tab: null,
    }),
    components: { ViewTickets }
}
</script>
<template>

    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary"
      >
        <v-tab value="one">View Orders</v-tab>
      </v-tabs>
  
      <v-card-text>
        <router-view />
      </v-card-text>
    </v-card>
  </template>