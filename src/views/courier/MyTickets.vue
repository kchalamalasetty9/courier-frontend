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
      <v-card-text style="overflow-y: scroll">
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>Order Details</v-card-title>
              <v-card-text>
                <strong>Ticket ID:</strong> {{ ticket?.ticketId }}
                <br>
                <strong>Estimated Delivery Time:</strong> {{ formatReadableDate(ticket?.estimatedDeliveryTime) }}
                <br>
                <strong>Quoted Price:</strong> {{ ticket?.quotedPrice }}
                <br>
                <strong>Status:</strong> {{ ticket?.status }}
                <br>
                <strong>Requested Pickup Time:</strong> {{ formatReadableDate(ticket?.requestedPickupTime) }}
                <br>
                <strong>Requested Pickup Location:</strong> {{ ticket?.requestedPickupLocation }}
                <br>
                <strong>Drop-off Location:</strong> {{ ticket?.dropOffLocation }}
                <br>
                <strong>Distance:</strong> {{ ticket?.distance }}
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
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>Route Details</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <strong class="mb-5">Route to Pickup from Office:</strong>

                    <!-- {{ ticket?.routeToPickupFromOffice }} -->
                    <div class="ml-5" v-for="instruction in instructionListForRoute(ticket?.routeToPickupFromOffice)"
                      :key="instruction">
                      <pre>{{ instruction }}</pre>
                    </div>
                  </v-col>
                  <v-col cols="4" style=" border-left: 1px #888 solid;">
                    <strong class="mb-5">Route to Delivery from Pickup:</strong>
                    <!-- {{ ticket?.routeToDeliveryFromPickup }} -->
                    <div class="ml-5" v-for="instruction in instructionListForRoute(ticket?.routeToDeliveryFromPickup)"
                      :key="instruction">
                      <pre>{{ instruction }}</pre>
                    </div>
                  </v-col>
                  <v-col cols="4" style=" border-left: 1px #888 solid;">
                    <strong class="mb-5">Route to Office from Delivery:</strong>
                    <!-- {{ ticket?.routeToOfficeFromDelivery }} -->
                    <div class="ml-5" v-for="instruction in instructionListForRoute(ticket?.routeToOfficeFromDelivery)"
                      :key="instruction">
                      <pre>{{ instruction }}</pre>
                    </div>
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
      isViewOpen: false
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
      // update call
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
          direction += 'EAST till ' + endX + ' Avenue';
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
  },

}
</script>