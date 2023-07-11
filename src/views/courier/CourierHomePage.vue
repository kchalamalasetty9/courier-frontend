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
        <v-tab value="one">View Tickets</v-tab>
      </v-tabs>
  
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <ViewTickets />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>