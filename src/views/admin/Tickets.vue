<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Order Id
        </th>
        <th class="text-left">
          Ordered By
        </th>
        <th class="text-left">
          Ordered to
        </th>
        <th class="text-left">
          Courier Number
        </th>
        <th class="text-left">
          Estimated Delivery Time
        </th>
        <th class="text-center">
          Quoted Price
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.ticketId">
        <td>{{ ticket.ticketId }}</td>
        <td>{{ ticket.orderedBy }}</td>
        <td>{{ ticket.orderedTo }}</td>
        <td>{{ ticket.courierNumber }}</td>
        <td>{{ ticket.estimatedDeliveryTime }}</td>
        <td>{{ ticket.quotedPrice }}</td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="red" @click="this.onDelete(user.id)">
              Delete
              <v-icon end icon="mdi-cancel"></v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import AdminServices from '../../services/AdminServices'

export default {
  data() {
    return {
      tickets: []
    }
  },
  async created() {
    await AdminServices.getTickets().then(data => {
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