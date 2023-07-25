<template>
  <div style="min-height: 500px;">

    <div class="text-h4 pa-2">

      Users
      <span style="float: right;">
        <v-btn @click="this.openAddUser()">
          Add User
          <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>


      </span>
    </div>
    <v-card>
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
            <th class="text-left">
              Status
            </th>
            <th class="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.name">
            <td style="text-transform: capitalize;">{{ user.firstName }}</td>
            <td style="text-transform: capitalize;">{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td style="text-transform: uppercase;">
              <strong>
                {{ user.userType }}
              </strong>
            </td>
            <td style="text-transform: capitalize;">{{ user.status }}</td>
            <td>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="this.onAccept(user.id)"
                  :disabled="user.status === 'accepted'">
                  Accept
                  <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" @click="this.onDecline(user.id)" :disabled="user.status === 'accepted'">
                  Decline
                  <v-icon end icon="mdi-cancel"></v-icon>
                </v-btn>
                <v-btn class="ma-2" color="grey" @click="this.onEdit(user)">
                  Edit
                  <v-icon end icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" @click="this.onDelete(user.id)">
                  Delete
                  <v-icon end icon="mdi-trash-can"></v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog persistent v-model="isAddUserOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Create Account </v-card-title>
        <v-card-text>
          <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>

          <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>

          <v-text-field v-model="user.email" label="Email" required></v-text-field>

          <v-text-field v-model="user.password" :type="'password'" label="Password" required></v-text-field>
          <v-select v-model="user.userType" label="UserType" :items="['courier', 'clerk', 'admin']"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeAddUser()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="AddUser()">Create Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="isEditUserOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Edit Account </v-card-title>
        <v-card-text>
          <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>

          <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>

          <v-text-field v-model="user.email" label="Email" required disabled></v-text-field>

          <v-select v-model="user.userType" label="UserType" :items="['courier', 'clerk', 'admin']" disabled></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeEditUser()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="editUser()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
import AdminServices from '../../services/AdminServices';
export default {
  data() {
    return {
      users: [],
      user: {},
      isAddUserOpen: false,
      isEditUserOpen: false,
      async onAccept(userId) {
        await AdminServices.acceptUserRegistration(userId);
        // this.users = this.users.filter(x => x.id !== userId);
        await AdminServices.getUsers().then(data => {
          this.users = data.data
        })
      },
      async onDecline(userId) {
        await AdminServices.declineUserRegistration(userId);
        // this.users = this.users.filter(x => x.id !== userId);
        await AdminServices.getUsers().then(data => {
          this.users = data.data
        })
      },
      onEdit(user) {
        this.user = user;
        this.openEditUser()
      },
      openAddUser() {
        this.user = {}
        this.isAddUserOpen = true;
      },
      closeAddUser() {
        this.isAddUserOpen = false;
      },
      openEditUser() {
        this.isEditUserOpen = true;
      },
      closeEditUser() {
        this.isEditUserOpen = false;
      },
      async AddUser() {
        await AdminServices.addUser(this.user);
        await AdminServices.getUsers().then(data => {
          this.users = data.data
        })
        this.closeAddUser()
      },
      async editUser() {
        await AdminServices.editUser({
          id: this.user.id,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        });
        await AdminServices.getUsers().then(data => {
          this.users = data.data
        })
        this.closeEditUser()
      },
      async onDelete(userId) {
        if (confirm("Are you sure want to delete the user ? this change is irreversible!") === true) {

          await AdminServices.deleteUser(userId);
          await AdminServices.getUsers().then(data => {
            this.users = data.data
          })
        }
      }
    }
  },
  async created() {
    await AdminServices.getUsers().then(data => {
      this.users = data.data
    })
  },
}
</script>