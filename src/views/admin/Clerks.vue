<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Clerk Number
        </th>
        <th class="text-left">
          Clerk Name
        </th>
        <th class="text-left">
          userId
        </th>
        <th class="text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="clerk in clerks" :key="clerk.clerkId">
        <td>{{ clerk.clerkId }}</td>
        <td>{{ clerk.clerkName }}</td>
        <td>{{ clerk.userId }}</td>
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
      clerks: []
    }
  },
  async created() {
    await AdminServices.getClerks().then(data => {
      this.clerks = data.data
    })
  },
  methods: {
    onDelete: (userId) => {
      console.log("onDelete Called", userId)
    },
  },
}
</script>