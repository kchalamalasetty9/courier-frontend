<template>
  <v-container>
    <v-card-title>Add Ticket</v-card-title>
    <v-form ref="form" @submit.prevent="submitForm">

      <v-select v-model="ticket.orderedBy" :items="customers" item-title="customerName" item-value="customerNumber"
        label="Ordered By" return-object single-line :disabled="ticket.isNewOrderBy"></v-select>
      <v-btn @click="() => { ticket.isNewOrderBy = true; ticket.orderedBy = null }" :disabled="ticket.isNewOrderBy" class="mb-2">New Order By
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
      <v-btn @click="() => { ticket.isNewOrderTo = true; ticket.orderedTo = null }" :disabled="ticket.isNewOrderTo" class="mb-2">New Order To
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
      <v-select v-model="ticket.selectedCourier" :items="couriers" item-title="courierName" item-value="courierNumber"
        label="Courier" return-object single-line></v-select>

      <v-text-field label="Requested Pickup Time" type="datetime-local" v-model="ticket.requestedPickupTime"></v-text-field>

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
    };
  },
  async created() {
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    // get available Couriers
    await ClerkServices.getCouriers().then(data => {
      this.couriers = data.data
    })
  },
  async mounted() {
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    // get available Couriers
    await ClerkServices.getCouriers().then(data => {
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
        console.log(this.ticket)
        try {
          
          await ClerkServices.createTicket(this.ticket);
          this.text = "Order Successful"
          
        } catch (error) {
          this.text = error
        }
        this.snackbar = true
        
        this.ticket = {}

      }

    },
  }
};
</script>

