<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Ticket Id
        </th>
        <th class="text-left">
          Ordered By
        </th>
        <th class="text-left">
          Ordered to
        </th>
        <th class="text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.ticketId">
        <td>{{ ticket.ticketId }}</td>
        <td>{{ ticket?.orderedByCustomer?.customerName }}</td>
        <td>{{ ticket?.orderedToCustomer?.customerName }}</td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="green" @click="this.onTake(ticket.ticketId)">
              Take
              <v-icon end icon="mdi-arrow-expand-down"></v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import CourierServices from '../../services/CourierServices'

export default {
  data() {
    return {
      tickets: []
    }
  },
  async created() {
    await CourierServices.getAvaliableTickets().then(data => {
      this.tickets = data.data
    })
  },
  methods: {
    async onTake(orderId){
      await CourierServices.takeOrder(orderId)
      await CourierServices.getAvaliableTickets().then(data => {
      this.tickets = data.data
    })
    },
  },
}
</script>