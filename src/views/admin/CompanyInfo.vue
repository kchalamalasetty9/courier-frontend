<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Company Info
        </th>
        <th class="text-left">
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in companies" :key="company.key">
        <td>{{ company.key }}</td>
        <td>{{ company.value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import AdminServices from '../../services/AdminServices'

export default {
  data() {
    return {
      companies: []
    }
  },
  async created() {
    await AdminServices.getCompanyInfo().then(data => {
      this.companies = data.data
    })
  },
  methods: {
    onDelete: (userId) => {
      console.log("onDelete Called", userId)
    },
  },
}
</script>