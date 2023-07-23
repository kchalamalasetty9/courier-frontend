<template>
  <div style="min-height: 500px;">
    <div class="text-h4 pa-2">Company Info


      <span style="float: right;">
        <v-btn @click="this.openAdd()">
          Add
          <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>
      </span>
    </div>
    <v-card>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Key
            </th>
            <th class="text-left">
              Value
            </th>
            <th class="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.key">
            <td>{{ company.key }}</td>
            <td>{{ company.value }}</td>
            <td>
              <div class="text-center">
                <v-btn class="ma-2" color="grey" @click="this.onEdit(company)">
                  Edit
                  <v-icon end icon="mdi-pencil"></v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" @click="this.onDelete(company.key)">
                  Delete
                  <v-icon end icon="mdi-trash-can"></v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog persistent v-model="isAddOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Add Entry</v-card-title>
        <v-card-text>
          <v-text-field v-model="company.key" label="Key" required></v-text-field>

          <v-text-field v-model="company.value" label="Value" required></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeAdd()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="addCompany()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="isEditOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Edit Entry</v-card-title>
        <v-card-text>
          <v-text-field v-model="company.key" label="Key" disabled></v-text-field>

          <v-text-field v-model="company.value" label="Value" required></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeEdit()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="editCompany()">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AdminServices from '../../services/AdminServices'

export default {
  data() {
    return {
      companies: [],
      company: {},
      isAddOpen: false,
      isEditOpen: false,

    }
  },
  async created() {
    await AdminServices.getCompanyInfo().then(data => {
      this.companies = data.data
    })
  },
  methods: {
    async onDelete(companyId) {
      await AdminServices.deleteCompany(companyId)
      await AdminServices.getCompanyInfo().then(data => {
        this.companies = data.data
      })
    },
    async addCompany() {
      await AdminServices.addCompany(this.company)
      await AdminServices.getCompanyInfo().then(data => {
        this.companies = data.data
      })
      this.closeAdd()
    },
    async editCompany() {
      await AdminServices.editCompany(this.company)
      await AdminServices.getCompanyInfo().then(data => {
        this.companies = data.data
      })
      this.closeEdit()
    },
    closeAdd() {
      this.isAddOpen = false
    },
    openAdd() {
      this.company = {}
      this.isAddOpen = true
    },
    closeEdit() {
      this.isEditOpen = false
    },
    openEdit() {
      this.isEditOpen = true
    },
    onEdit(company) {
      this.company = company,
      this.openEdit()
    }
  },
}
</script>