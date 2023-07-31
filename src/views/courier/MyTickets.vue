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
        <th class="text-left">
          Status
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
        <td>{{ readableStatus(ticket.status) }}</td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="blue" @click="this.view(ticket)">
              View
              <v-icon end icon="mdi-open-in-app"></v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog persistent v-model="isViewOpen" width="1000">
    <v-card class="rounded-lg elevation-5">
      <v-card-title class="headline">Ticket Details</v-card-title>
      <v-card-subtitle class="caption"><strong>Ticket ID:</strong> {{ ticket?.ticketId }}</v-card-subtitle>
      <v-card-text style="overflow-y: scroll">
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
          <v-col cols="12">
            Change Status
            <v-select v-model="ticket.status" label="Status" :items="orderStatus" item-title="name"
              item-value="value"></v-select>

          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Route Details</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <strong class="mb-5">Route to Pickup from Office:</strong>

                    <!-- {{ ticket?.routeToPickupFromOffice }} -->
                    <li v-for="instruction in instructionListForRoute(ticket?.routeToPickupFromOffice)"
                      :key="instruction">
                      {{ instruction }}
                    </li>
                  </v-col>
                  <v-col cols="4" style=" border-left: 1px lightgray solid;">
                    <strong class="mb-5">Route to Delivery from Pickup:</strong>
                    <!-- {{ ticket?.routeToDeliveryFromPickup }} -->
                    <li v-for="instruction in instructionListForRoute(ticket?.routeToDeliveryFromPickup)"
                      :key="instruction">
                      {{ instruction }}
                    </li>
                  </v-col>
                  <v-col cols="4" style=" border-left: 1px lightgray solid;">
                    <strong class="mb-5">Route to Office from Delivery:</strong>
                    <!-- {{ ticket?.routeToOfficeFromDelivery }} -->
                    <li v-for="instruction in instructionListForRoute(ticket?.routeToOfficeFromDelivery)"
                      :key="instruction">
                      {{ instruction }}
                    </li>
                  </v-col>
                </v-row>


              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="secondary" @click="closeView()">Close</v-btn>
        <v-btn variant="flat" color="primary" @click="updateTicket()">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CourierServices from '../../services/CourierServices'

export default {
  data() {
    return {
      tickets: [],
      ticket: {},
      isViewOpen: false,
      orderStatus: [
        { value: 'pending', name: 'Pending' },
        { value: 'driver-left-facility', name: 'Left Facility' },
        { value: 'driver-picked-up-order', name: 'Picked Up Order' },
        { value: 'delivered', name: 'Delivered' },]
    }
  },
  async created() {
    await CourierServices.getTickets().then(data => {
      this.tickets = data.data
    })
  },
  methods: {
    view(ticket) {
      this.ticket = ticket;
      this.isViewOpen = true
    },
    closeView() {
      this.isViewOpen = false
    },
    async updateTicket() {
      await CourierServices.updateTicketStatus(this.ticket)
      this.closeView()
      this.reloadTickets()
    },
    async reloadTickets() {
      await CourierServices.getTickets().then(data => {
        this.tickets = data.data
      })
    },
    instructionListForRoute(instructions) {
      const startingPoints = instructions.split(":");
      const results = []
      function getDirection(start, end) {
        const [startX, startY] = start.split('');
        const [endX, endY] = end.split('');

        const dx = endX.charCodeAt(0) - startX.charCodeAt(0);
        const dy = parseInt(endY, 10) - parseInt(startY, 10);

        let direction = '';

        if (dx > 0) {
          direction += 'EAST Till ' + endX + ' Avenue';
        } else if (dx < 0) {
          direction += 'WEST till ' + endX + ' Avenue';
        }

        if (dy > 0) {
          if (direction !== '') {
            direction += ' and ';
          }
          direction += 'SOUTH till ' + endY + ' Street';
        } else if (dy < 0) {
          if (direction !== '') {
            direction += ' and ';
          }
          direction += 'NORTH till ' + endY + ' Street';
        }

        return direction || 'Stay at the same location';
      }

      for (let i = 0; i < startingPoints.length - 1; i++) {
        const start = startingPoints[i];
        const end = startingPoints[i + 1];
        const direction = getDirection(start, end);

        results.push('Go Towards ' + direction);
      }
      return results
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
    readableStatus(status) {
      return this.orderStatus.filter(x => x.value === status)[0].name ?? ''
    }
  },

}
</script>