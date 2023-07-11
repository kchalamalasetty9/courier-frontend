<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          First Name
        </th>
        <th class="text-left">
          Last Name
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          User Type
        </th>
        <th class="text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.name">
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td style="text-transform: uppercase;">
          <strong>
            {{ user.userType }}
          </strong>
        </td>
        <td>
          <div class="text-center">
            <v-btn class="ma-2" color="primary" @click="this.onAccept(user.id)">
              Accept
              <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
            </v-btn>

            <v-btn class="ma-2" color="red" @click="this.onDecline(user.id)">
              Decline
              <v-icon end icon="mdi-cancel"></v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import AdminServices from '../../services/AdminServices';
import UserServices from '../../services/UserServices';
export default {
  data() {
    return {
      users: [],
      onAccept(userId) {
        AdminServices.acceptUserRegistration(userId);
        this.users = this.users.filter(x => x.id !== userId);
        console.log("onAccept Called", userId)
      },
      onDecline(userId) {
        AdminServices.declineUserRegistration(userId);
        this.users = this.users.filter(x => x.id !== userId);
        console.log("onDecline Called", userId)
      },
    }
  },
  async created() {
    await UserServices.getUsers().then(data => {
      this.users = data.data
    })
  },
}
</script>