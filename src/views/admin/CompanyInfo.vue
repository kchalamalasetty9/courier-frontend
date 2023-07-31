<template>
  <div style="min-height: 500px;">
    <div class="text-h4 pa-2">Company Information
      <span style="float: right;">
        <v-btn color="blue" @click="this.onCompanyReport()">
          Company Report
          <v-icon end icon="mdi-open-in-app"></v-icon>
        </v-btn>

        <v-btn class="ml-5" @click="this.openEdit()">
          Edit
          <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>

      </span>
    </div>
    <v-card class="ml-5">
      <v-card-title>
        Company Information
      </v-card-title>
      <v-card-text class="ml-5">
        <p><strong>Name:</strong> {{ company.name }}</p>
        <p><strong>Price per block:</strong> ${{ company.price_per_block }}</p>
        <p><strong>Time per block:</strong> {{ company.time_per_block }} minutes</p>
        <p><strong>Ontime Bonus Percentage:</strong> {{ company.ontime_bonus_percentage }}%</p>
        <p><strong>Office NorthSouth Street:</strong> {{ company.office_northsouth_street }} Street</p>
        <p><strong>Office EastWest Street:</strong> {{ company.office_eastwest_street }} Avenue</p>
      </v-card-text>
    </v-card>

    <v-dialog persistent v-model="isEditOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Edit Entry</v-card-title>
        <v-card-text class="ml-5">
          <v-text-field v-model="company.name" label="Name" outlined></v-text-field>
          <v-text-field v-model="company.price_per_block" label="Price per block" outlined type="number"
            step="0.01"></v-text-field>
          <v-text-field v-model="company.time_per_block" label="Time per block" outlined type="number"></v-text-field>
          <v-text-field v-model="company.ontime_bonus_percentage" label="Ontime Bonus Percentage" outlined
            type="number"></v-text-field>
          <v-text-field v-model="company.office_northsouth_street" label="Office NorthSouth Street"
            outlined></v-text-field>
          <v-text-field v-model="company.office_eastwest_street" label="Office EastWest Street" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeEdit()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="editCompany()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="isCompanyReportOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline">Company Report</v-card-title>
        <v-card-text class="pt-0">
          <table id="company-report">
            <tr>
              <th class="text-left">Customer</th>
              <th class="text-left">Num of Orders</th>
              <th class="text-left">Total Billing</th>
            </tr>
            <tbody>
              <tr v-for="entry in reportData" :key="entry.orderedBy">
                <td>{{ entry.orderedBy }}</td>
                <td>{{ entry.numTickets }}</td>
                <td>$ {{ entry.totalBilling }}</td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeCompanyReport()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="generateCompanyReportPDF()">
            <v-icon icon="mdi-download"></v-icon>
            <span>Download PDF</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AdminServices from '../../services/AdminServices'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
const doc = new jsPDF()

export default {
  data() {
    return {
      company: {},
      isEditOpen: false,
      isCompanyReportOpen: false,
      reportData: {}
    }
  },
  async created() {
    await AdminServices.getCompanyInfo().then(data => {
      this.company = data.data[0]
    })
  },
  methods: {
    async onDelete(companyId) {
      await AdminServices.deleteCompany(companyId)
      await AdminServices.getCompanyInfo().then(data => {
        this.company = data.data[0]
      })
    },
    async editCompany() {
      await AdminServices.editCompany(this.company)
      await AdminServices.getCompanyInfo().then(data => {
        this.company = data.data[0]
      })
      this.closeEdit()
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
    },
    closeCompanyReport() {
      this.isCompanyReportOpen = false
    },
    openCompanyReport() {
      this.isCompanyReportOpen = true
    },
    async onCompanyReport() {
      await AdminServices.getCompanyReport().then(data => {
        this.reportData = data.data
      })
      this.openCompanyReport()
    },
    generateCompanyReportPDF() {
      autoTable(doc, { html: '#company-report', useCss: true });
      doc.text('Company Report', 10, 10)
      doc.save('company-report.pdf')
    }
  },
}
</script>
<style>
#company-report {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#company-report td, #company-report th {
  border: 1px solid #ddd;
  padding: 8px;
}

#company-report tr:nth-child(even){background-color: #f2f2f2;}

#company-report tr:hover {background-color: #ddd;}

#company-report th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(83, 83, 255);
  color: white;
}
</style>