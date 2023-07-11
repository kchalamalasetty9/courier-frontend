<template>
  <v-app>
    <v-container>
      <v-card-title>Add Ticket</v-card-title>
      <v-form ref="form" @submit.prevent="submitForm">

        <v-select v-model="orderedBy" :hint="`${orderedBy?.customerName}${orderedBy?.customerNumber}`" :items="customers"
          item-title="customerName" item-value="customerNumber" label="Ordered By" return-object single-line></v-select>

        <v-text-field v-model="estimatedDeliveryTime" label="Estimated Delivery Time" disabled></v-text-field>
        <v-text-field v-model="quotedPrice" label="Quoted Price" disabled></v-text-field>
        <v-select v-model="orderedTo" :hint="`${orderedTo?.customerName}${orderedTo?.customerNumber}`"
          :items="customers" item-title="customerName" item-value="customerNumber"
          label="Ordered To" return-object single-line></v-select>
        <v-btn type="submit" color="primary">Create</v-btn>
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
  </v-app>
</template>

<script>
import ClerkServices from '../../services/ClerkServices';

export default {
  data() {
    return {
      orderedBy: null,
      estimatedDeliveryTime: '',
      orderedTo: null,
      quotedPrice: '',
      orderedTo: null,
      customers: [],
      couriers: [],
      snackbar: false,
      text: '',
    };
  },
  async created() {
    await ClerkServices.getCustomers().then(data => {
      this.customers = data.data
    })
    await ClerkServices.getCouriers().then(data => {
      this.couriers = data.data
    })
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Perform form submission logic here

        if (this.orderedTo === this.orderedBy) {
          this.text = "Ordered To and Ordered By cannot be the same."
          this.snackbar = true
          return;
        }
        console.log(
          this.orderedBy,
          this.estimatedDeliveryTime,
          this.quotedPrice,
          this.orderedTo)
        console.log('Form submitted successfully');
      }
    }
  }
};
</script>

