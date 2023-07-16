<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        Add Customer
      </v-btn>
    </template>

    <v-card>
      <v-card>
        <v-card-title>Create Customer</v-card-title>
        <v-card-text>
          <v-form ref="createForm" @submit.prevent="createCustomer">
            <v-text-field v-model="customer.customerName" label="Customer Name" required></v-text-field>
            <v-select v-model="customer.avenue" :items="avenueOptions" label="Avenue" required></v-select>
            <v-select v-model="customer.street" :items="streetOptions" label="Street" required></v-select>
            <v-text-field v-model="customer.deliveryInstructions" label="Delivery Instructions" required></v-text-field>
            <v-card-actions>
              <v-btn type="submit" color="primary">Create Customer</v-btn>
              <v-btn color="secondary" @click="dialog = false;">Close</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>

    </v-card>
  </v-dialog>
  <v-card>
    <v-card-title>View Customers</v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Customer Name
          </th>
          <th class="text-left">
            Customer Number
          </th>
          <th class="text-left">
            Location
          </th>
          <th class="text-left">
            Delivery Instructions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.customerNumber">
          <td>{{ customer.customerName }}</td>
          <td>{{ customer.customerNumber }}</td>
          <td>{{ `${customer.avenue + getOrdinal(customer.avenue)} Avenue, ${customer.street + getOrdinal(customer.street)} Street` }}</td>
          <td>{{ customer.deliveryInstructions }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import ClerkService from '../../services/ClerkServices.js'

export default {
  data() {
    return {
      dialog: false,
      customers: [],
      customer: {},
      avenueOptions: ['1', '2', '3', '4', '5', '6', '7'],
      streetOptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    }
  },
  async created() {
    await ClerkService.getCustomers().then(data => {
      this.customers = data.data
    })
  },
  methods: {
    onDelete: (userId) => {
      console.log("onDelete Called", userId)
    },
    async createCustomer() {
      console.log(this.customer)
      await ClerkService.createCustomer(this.customer);
      await ClerkService.getCustomers().then(data => {
        this.customers = data.data
      })
      this.dialog = false;
    },
    clearFields() {
      this.customerName = '';
      this.location = '';
      this.deliveryInstructions = '';
    },
    getOrdinal(n) {
      let ord = 'th';

      if (n % 10 == 1 && n % 100 != 11) {
        ord = 'st';
      }
      else if (n % 10 == 2 && n % 100 != 12) {
        ord = 'nd';
      }
      else if (n % 10 == 3 && n % 100 != 13) {
        ord = 'rd';
      }

      return ord;
    }
  },
}
</script>