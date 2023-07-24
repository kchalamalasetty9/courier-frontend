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
        <th class="text-center">
          Availability
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="courier in couriers" :key="courier.courierNumber">
        <td>{{ courier.courierNumber }}</td>
        <td>{{ courier.courierName }}</td>

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
  },
  methods: {
  },
}
</script>