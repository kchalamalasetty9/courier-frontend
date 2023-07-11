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
        <td>{{ ticket.orderedBy }}</td>
        <td>{{ ticket.orderedTo }}</td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="red" @click="this.onDelete(user.id)">
              Take
              <v-icon end icon="mdi-cancel"></v-icon>
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
    await CourierServices.getTickets().then(data => {
      this.tickets = data.data
    })
  },
  methods: {
    onDelete: (userId) => {
      console.log("onDelete Called", userId)
    },
  },
}
</script>