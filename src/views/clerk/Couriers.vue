<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Courier Number
        </th>
        <th class="text-left">
          Courier Name
        </th>
        <th class="text-left">
          Availability
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="courier in couriers" :key="courier.courierNumber">
        <td>{{ courier.courierNumber }}</td>
        <td>{{ courier.courierName }}</td>
        <td style="text-transform: capitalize;">{{ courier.isAvailable }}</td>

      </tr>
    </tbody>
  </v-table>
</template>
<script>
import ClerkServices from '../../services/ClerkServices'


export default {
  data() {
    return {
      couriers: []
    }
  },
  async created() {
    await ClerkServices.getCouriers().then(data => {
      this.couriers = data.data
    })
    await ClerkServices.getAvailableCouriers().then(data => {
      const availableCouriers = data.data;
      console.log(this.couriers, availableCouriers)
      this.couriers.forEach(c => c.isAvailable = availableCouriers.filter(x => x.courierNumber === c.courierNumber).length !== 0)
    })
  },
  methods: {
  },
}
</script>