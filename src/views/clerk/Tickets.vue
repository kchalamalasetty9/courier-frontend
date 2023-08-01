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
            Courier Name
          </th>
          <th class="text-left">
            Requested Pickup Time
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.ticketId">
          <td>{{ ticket?.ticketId }}</td>
          <td>{{ ticket?.orderedByCustomer?.customerName }}</td>
          <td>{{ ticket?.orderedToCustomer?.customerName }}</td>
          <td>{{ ticket?.courier?.courierName }}</td>
          <td>{{ formatReadableDate(ticket.requestedPickupTime) }}</td>
          <td style="text-transform: uppercase;font-weight: 600;">{{ ticket?.status }}</td>
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
    <v-dialog persistent v-model="isEditOpen" width="900">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Edit Ticket</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>Order Details</v-card-title>
                <v-card-text>
                  <strong>Estimated Delivery Time:</strong> {{ formatReadableDate(ticket?.estimatedDeliveryTime) }}
                  <br>
                  <strong>Quoted Price:</strong> ${{ ticket?.quotedPrice }}
                  <br>
                  <strong>Requested Pickup Time:</strong> {{ formatReadableDate(ticket?.requestedPickupTime) }}
                  <br>
                  <strong>Requested Pickup Location:</strong> {{ ticket?.requestedPickupLocation }}
                  <br>
                  <strong>Drop-off Location:</strong> {{ ticket?.dropOffLocation }}
                  <br>
                  <strong>Distance:</strong> {{ ticket?.distance }} miles.
                  <br>
                  <strong>Status:</strong> {{ ticket?.status }}
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card>
                <v-card-title>Time Details</v-card-title>
                <v-card-text>
                  <strong>Estimated Start Time:</strong> {{ formatReadableDate(ticket?.estimatedStartTime) }}
                  <br>
                  <strong>Estimated Pickup Time:</strong> {{ formatReadableDate(ticket?.estimatedPickupTime) }}
                  <br>
                  <strong>Actual Start Time:</strong> {{ formatReadableDate(ticket?.actualStartTime) }}
                  <br>
                  <strong>Actual Pickup Time:</strong> {{ formatReadableDate(ticket?.actualPickupTime) }}
                  <br>
                  <strong>Actual Delivery Time:</strong> {{ formatReadableDate(ticket?.actualDeliveryTime) }}
                  <br>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <br>
          <v-select v-model="ticket.orderedByCustomer" :items="customers" item-title="customerName" item-value="customerNumber"
            label="Ordered By" return-object single-line :disabled="ticket.isNewOrderBy"></v-select>

          <v-select v-model="ticket.orderedToCustomer" :items="customers" item-title="customerName" item-value="customerNumber"
            label="Ordered To" return-object single-line :disabled="ticket.isNewOrderTo"></v-select>
          <br>
          <v-select v-model="ticket.selectedCourier" :items="couriers" item-title="courierName" item-value="courierNumber"
            label="Courier" return-object single-line></v-select>

          <v-text-field label="Requested Pickup Time" type="datetime-local"
            v-model="ticket.requestedPickupTime"></v-text-field>

          <v-text-field v-if="estimatedPrice" v-model="estimatedPrice" label="Estimated Price" prefix="$"
            readonly></v-text-field>
          <v-text-field v-if="estimatedTimeToComplete" v-model="estimatedTimeToComplete" label="Estimated TimeToComplete"
            readonly suffix="minutes"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeEdit()">Close</v-btn>
          <v-btn variant="flat" color="yellow" @click="cancelTicket()">Cancel
            <v-icon end icon="mdi-cancel"></v-icon>
          </v-btn>
          <v-btn variant="flat" color="primary" @click="editTicket()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ClerkServices from '../../services/ClerkServices'
const pricePerBlock = 1.5
const timePerBlock = 3

export default {
  data() {
    return {
      tickets: [],
      ticket: {},
      isEditOpen: false,
      customers: [],
      couriers: [],
      estimates: {},
      estimatedPrice: null,
      estimatedTimeToComplete: null,
      requestedPickupLocation: null,
      dropOffLocation: null,
      distance: null,
      routeToPickupFromOffice: null,
      routeToDeliveryFromPickup: null,
      routeToOfficeFromDelivery: null,
      distances: {}
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
    await ClerkServices.getAvailableCouriers().then(data => {
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
    await ClerkServices.getAvailableCouriers().then(data => {
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
      if (dateString) {
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
      }
      return ''

    },
    async editTicket() {

      function addMinutesToISODate(isoDate, minutesToAdd) {
        const date = new Date(isoDate);
        date.setMinutes(date.getMinutes() + minutesToAdd);
        return date.toISOString();
      }

      await this.estimateTimeAndPrice()

      console.log(this.ticket)

      this.ticket.quotedPrice = this.estimatedPrice;
      this.ticket.estimatedStartTime = this.ticket.requestedPickupTime;
      this.ticket.estimatedDeliveryTime = addMinutesToISODate(this.ticket.requestedPickupTime, this.estimatedTimeToComplete)
      this.ticket.estimatedPickupTime = addMinutesToISODate(this.ticket.requestedPickupTime, this.distances.o)
      this.ticket.requestedPickupLocation = this.requestedPickupLocation
      this.ticket.dropOffLocation = this.dropOffLocation
      this.ticket.distance = this.distance
      this.ticket.routeToDeliveryFromPickup = this.routeToDeliveryFromPickup
      this.ticket.routeToOfficeFromDelivery = this.routeToOfficeFromDelivery
      this.ticket.routeToPickupFromOffice = this.routeToPickupFromOfficeÏ

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
      this.estimatedPrice = null;
      this.estimatedTimeToComplete = null;
      console.log(ticket)
      const rpt = new Date(ticket.requestedPickupTime)
      rpt.setHours(rpt.getHours() - 5)
      const requestedPickupTime = rpt.toISOString()?.slice(0, -1)
      this.ticket = { ...ticket, orderedBy: ticket.orderedByCustomer, orderedTo: ticket.orderedToCustomer, selectedCourier: ticket.courier, requestedPickupTime },
        this.openEdit()
    },
    async cancelTicket() {
      this.ticket.status = 'canceled'
      await ClerkServices.updateTicketStatus(this.ticket)
      this.closeEdit()
      await ClerkServices.getTickets().then(data => {
        this.tickets = data.data
      })
    },
    async estimateTimeAndPrice() {
      let sourceNode = ''
      let destinationNode = '';

      let ss = '', sa = ''
      let ds = '', da = ''
      console.log("estimateTime ")
      if (this.ticket.isNewOrderBy) {
        ss = this.ticket.newOrderedBy?.street
        sa = this.ticket.newOrderedBy?.avenue
      } else {
        ss = this.ticket.orderedByCustomer?.street;
        sa = this.ticket.orderedByCustomer?.avenue;
      }
      if (this.ticket.isNewOrderTo) {
        ds = this.ticket.newOrderedTo?.street
        da = this.ticket.newOrderedTo?.avenue
      } else {
        ds = this.ticket.orderedToCustomer?.street
        da = this.ticket.orderedToCustomer?.avenue
      }
      sourceNode = ss + sa;
      destinationNode = ds + da;

      console.log(sourceNode, destinationNode)
      if (sourceNode.length == 2 && destinationNode.length == 2) {
        const data = await ClerkServices.ticketEstimates(sourceNode, destinationNode)
        this.estimates = data.data;
        // TODO: Get Estimates from Company Info
        const blockDistance = data.data.s.distance + data.data.o.distance + data.data.d.distance
        this.estimatedPrice = blockDistance * pricePerBlock;
        this.estimatedTimeToComplete = blockDistance * timePerBlock;
        console.log(this.estimatedTimeToComplete)
        this.requestedPickupLocation = `${ss} Street , ${sa}Avenue`
        this.dropOffLocation = `${ds} Street , ${da}Avenue`
        this.distance = blockDistance;
        this.routeToPickupFromOffice = data.data.o.path.join(':')
        this.routeToDeliveryFromPickup = data.data.s.path.join(':')
        this.routeToOfficeFromDelivery = data.data.d.path.join(':')
        this.distances = {
          o: data.data.o.distance,
          d: data.data.d.distance,
          s: data.data.s.distance,
        }

      } else {
        this.estimates = {}
        this.estimatedPrice = null;
        this.estimatedTimeToComplete = null;
      }
    }
  },
  watch: {
    async 'ticket.orderedByCustomer'(newVal, oldVal) {
      this.estimateTimeAndPrice()
    },
    async 'ticket.orderedToCustomer'(newVal, oldVal) {
      this.estimateTimeAndPrice()
    },
  }
}
</script>