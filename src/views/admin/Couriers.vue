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
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="courier in couriers" :key="courier.courierNumber">
        <td>{{ courier.courierNumber }}</td>
        <td>{{ courier.courierName }}</td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="red" @click="this.onDelete(user.id)">
              Delete
              <v-icon end icon="mdi-cancel"></v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import AdminServices from '../../services/AdminServices'

export default {
  data() {
    return {
      couriers: []
    }
  },
  async created() {
    await AdminServices.getCouriers().then(data => {
      this.couriers = data.data
    })
  },
  methods: {
    onDelete: (userId) => {
      console.log("onDelete Called", userId)
    },
  },
}
</script>