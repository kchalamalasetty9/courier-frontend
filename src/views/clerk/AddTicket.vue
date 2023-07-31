<template>
  <v-container>
    <v-card-title>Add Ticket</v-card-title>
    <v-form ref="form" @submit.prevent="submitForm">

      <v-select v-model="ticket.orderedBy" :items="customers" item-title="customerName" item-value="customerNumber"
        label="Ordered By" return-object single-line :disabled="ticket.isNewOrderBy"></v-select>
      <v-btn @click="() => { ticket.isNewOrderBy = true; ticket.orderedBy = null }" :disabled="ticket.isNewOrderBy"
        class="mb-2">New Order By
        Customer</v-btn>

      <v-container v-if="ticket.isNewOrderBy">
        <v-card>
          <v-card>
            <v-card-title>Ordered By Customer <span style="float: right;"><v-icon end icon="mdi-close"
                  @click="() => { ticket.isNewOrderBy = false }"></v-icon></span></v-card-title>

            <v-card-text>
              <v-form>
                <v-text-field v-model="ticket.newOrderedBy.customerName" label="Customer Name" required></v-text-field>
                <v-select v-model="ticket.newOrderedBy.avenue" :items="avenueOptions" label="Avenue" required></v-select>
                <v-select v-model="ticket.newOrderedBy.street" :items="streetOptions" label="Street" required></v-select>
                <v-text-field v-model="ticket.newOrderedBy.deliveryInstructions" label="Delivery Instructions"
                  required></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card>
      </v-container>
      <v-select v-model="ticket.orderedTo" :items="customers" item-title="customerName" item-value="customerNumber"
        label="Ordered To" return-object single-line :disabled="ticket.isNewOrderTo"></v-select>
      <v-btn @click="() => { ticket.isNewOrderTo = true; ticket.orderedTo = null }" :disabled="ticket.isNewOrderTo"
        class="mb-2">New Order To
        Customer</v-btn>
      <v-container v-if="ticket.isNewOrderTo">
        <v-card>
          <v-card>
            <v-card-title>Ordered To Customer<span style="float: right;"><v-icon end icon="mdi-close"
                  @click="() => { ticket.isNewOrderTo = false }"></v-icon></span></v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="ticket.newOrderedTo.customerName" label="Customer Name" required></v-text-field>
                <v-select v-model="ticket.newOrderedTo.avenue" :items="avenueOptions" label="Avenue" required></v-select>
                <v-select v-model="ticket.newOrderedTo.street" :items="streetOptions" label="Street" required></v-select>
                <v-text-field v-model="ticket.newOrderedTo.deliveryInstructions" label="Delivery Instructions"
                  required></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card>
      </v-container>
      <br>
      <v-text-field v-if="estimatedPrice" v-model="estimatedPrice" label="Estimated Price" prefix="$"
        readonly></v-text-field>
      <v-text-field v-if="estimatedTimeToComplete" v-model="estimatedTimeToComplete" label="Estimated TimeToComplete"
        readonly suffix="minutes"></v-text-field>
      <v-select v-model="ticket.selectedCourier" :items="couriers" item-title="courierName" item-value="courierNumber"
        label="Courier" return-object single-line no-data-text="No Custom Couriers available"></v-select>

      <v-text-field label="Requested Pickup Time" type="datetime-local"
        v-model="ticket.requestedPickupTime"></v-text-field>


      <v-btn type="submit" color="primary" class="mt-2">Create</v-btn>
    </v-form>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import ClerkServices from '../../services/ClerkServices';
const pricePerBlock = 1.5
const timePerBlock = 3
export default {
  data() {
    return {
      ticket: {
        orderedBy: null,
        orderedTo: null,
        newOrderedBy: {},
        newOrderedTo: {},
        isNewOrderBy: false,
        isNewOrderTo: false,
      },
      customers: [],
      couriers: [],
      snackbar: false,
      text: '',
      avenueOptions: ['1', '2', '3', '4', '5', '6', '7'],
      streetOptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      availableCouriers: [],
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
    };
  },
  async created() {
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    // get available Couriers
    await ClerkServices.getAvailableCouriers().then(data => {
      this.couriers = data.data
    })
  },
  async mounted() {
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    // get available Couriers
    await ClerkServices.getAvailableCouriers().then(data => {
      this.couriers = data.data
    })
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        // Perform form submission logic here

        if (this.ticket.orderedTo === this.ticket.orderedBy && (this.ticket.orderedTo !== null || this.ticket.orderedBy !== null)) {
          this.text = "Ordered To and Ordered By cannot be the same."
          this.snackbar = true
          return;
        }

        function addMinutesToISODate(isoDate, minutesToAdd) {
          const date = new Date(isoDate);
          date.setMinutes(date.getMinutes() + minutesToAdd);
          return date.toISOString();
        }

        try {
          this.ticket.quotedPrice = this.estimatedPrice;
          this.ticket.estimatedDeliveryTime = addMinutesToISODate(this.ticket.requestedPickupTime, this.estimatedTimeToComplete)
          this.ticket.estimatedPickupTime = addMinutesToISODate(this.ticket.requestedPickupTime, this.distances.o)
          this.ticket.requestedPickupLocation = this.requestedPickupLocation
          this.ticket.dropOffLocation = this.dropOffLocation
          this.ticket.distance = this.distance
          this.ticket.routeToDeliveryFromPickup = this.routeToDeliveryFromPickup
          this.ticket.routeToOfficeFromDelivery = this.routeToOfficeFromDelivery
          this.ticket.routeToPickupFromOffice = this.routeToPickupFromOffice
          await ClerkServices.createTicket(this.ticket);
          this.text = "Order Successful"

        } catch (error) {
          this.text = error
        }
        this.snackbar = true

        this.ticket = {}
        // get available Couriers
        await ClerkServices.getAvailableCouriers().then(data => {
          this.couriers = data.data
        })

      }

    },
    async estimateTimeAndPrice() {
      let sourceNode = ''
      let destinationNode = '';

      let ss = '', sa = ''
      let ds = '', da = ''
      console.log()
      if (this.ticket.isNewOrderBy) {
        ss = this.ticket.newOrderedBy?.street
        sa = this.ticket.newOrderedBy?.avenue
      } else {
        ss = this.ticket.orderedBy?.street;
        sa = this.ticket.orderedBy?.avenue;
      }
      if (this.ticket.isNewOrderTo) {
        ds = this.ticket.newOrderedTo?.street
        da = this.ticket.newOrderedTo?.avenue
      } else {
        ds = this.ticket.orderedTo?.street
        da = this.ticket.orderedTo?.avenue
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
    async 'ticket.orderedBy'(newVal, oldVal) {
      this.estimateTimeAndPrice()
    },
    async 'ticket.orderedTo'(newVal, oldVal) {
      this.estimateTimeAndPrice()
    },
    async 'ticket.newOrderedBy.street'(newVal, oldVal) {

      this.estimateTimeAndPrice()
    },
    async 'ticket.newOrderedTo.street'(newVal, oldVal) {
      this.estimateTimeAndPrice()

    },
    async 'ticket.newOrderedBy.avenue'(newVal, oldVal) {

      this.estimateTimeAndPrice()
    },
    async 'ticket.newOrderedTo.avenue'(newVal, oldVal) {
      this.estimateTimeAndPrice()
    },
  },
};
</script>

