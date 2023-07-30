<template>
  <div style="min-height: 500px;">
    <div class="text-h4 pa-2">Orders</div>
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
            Requested Pickup Time
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.ticketId">
          <td>{{ ticket.ticketId }}</td>
          <td>{{ ticket.orderedByCustomer.customerName }}</td>
          <td>{{ ticket.orderedToCustomer.customerName }}</td>
          <td>{{ ticket.courier.courierName }}</td>
          <td>{{ formatReadableDate(ticket.requestedPickupTime) }}</td>
          <td>
            <div class="text-center">
              <v-btn class="ma-2" color="grey" @click="this.onEdit(ticket)">
                Edit
                <v-icon end icon="mdi-pencil"></v-icon>
              </v-btn>
              <v-btn class="ma-2" color="red" @click="this.onDelete(ticket.ticketId)">
                Delete
                <v-icon end icon="mdi-trash-can"></v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog persistent v-model="isEditOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Edit Ticket</v-card-title>
        <v-card-text>

          <v-select v-model="ticket.orderedBy" :items="customers" item-title="customerName" item-value="customerNumber"
            label="Ordered By" return-object single-line :disabled="ticket.isNewOrderBy"></v-select>

          <v-select v-model="ticket.orderedTo" :items="customers" item-title="customerName" item-value="customerNumber"
            label="Ordered To" return-object single-line :disabled="ticket.isNewOrderTo"></v-select>
          <br>
          <v-select v-model="ticket.selectedCourier" :items="couriers" item-title="courierName" item-value="courierNumber"
            label="Courier" return-object single-line></v-select>

          <v-text-field label="Requested Pickup Time" type="datetime-local"
            v-model="ticket.requestedPickupTime"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeEdit()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="editTicket()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ClerkServices from '../../services/ClerkServices'

export default {
  data() {
    return {
      tickets: [],
      ticket: {},
      isEditOpen: false,
      customers: [],
      couriers: [],
    }
  },
  async created() {
    await ClerkServices.getTickets().then(data => {
      this.tickets = data.data
    }),
      await ClerkServices.getCustomers().then(data => {
        this.customers = data.data
      })
    // get available Couriers
    await ClerkServices.getCouriers().then(data => {
      this.couriers = data.data
    })
  },
  async mounted() {
    console.log("mounted")
    await ClerkServices.getTickets().then(data => {
      this.tickets = data.data
    })
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    // get available Couriers
    await ClerkServices.getCouriers().then(data => {
      this.couriers = data.data
    })
  },
  methods: {
    async onDelete(ticketId) {
      console.log("onDelete Called", ticketId)
      await ClerkServices.deleteTicket(ticketId)
      await ClerkServices.getTickets().then(data => {
        this.tickets = data.data
      })
    },
    formatReadableDate(dateString) {
      const dateObj = new Date(dateString);

      // Formatting options
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };

      // Format the date
      const formattedDate = dateObj.toLocaleDateString("en", options);
      return formattedDate;
    },
    async editTicket() {

      await ClerkServices.editTicket({ ...this.ticket, orderedBy: this.ticket.orderedByCustomer.customerNumber, orderedTo: this.ticket.orderedToCustomer.customerNumber, selectedCourier: this.ticket.selectedCourier })
      await ClerkServices.getTickets().then(data => {
        this.tickets = data.data
      })
      this.closeEdit()
    },

    closeEdit() {
      this.isEditOpen = false
    },
    openEdit() {
      this.isEditOpen = true
    },
    onEdit(ticket) {
      const rpt = new Date(ticket.requestedPickupTime)
      rpt.setHours(rpt.getHours() - 5)
      const requestedPickupTime = rpt.toISOString()?.slice(0, -1)
      this.ticket = { ...ticket, orderedBy: ticket.orderedByCustomer, orderedTo: ticket.orderedToCustomer, selectedCourier: ticket.courier, requestedPickupTime },
        this.openEdit()
    },
  },
}
</script>