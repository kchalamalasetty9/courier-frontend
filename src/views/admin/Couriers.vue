<template>
  <div style="min-height: 500px;">
    <div class="text-h4 pa-2">Couriers
    </div>
    <v-card class="ml-5">
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="courier in couriers" :key="courier.courierNumber">
            <td>{{ courier.courierNumber }}</td>
            <td>{{ courier.courierName }}</td>
            <td>
              <v-btn color="blue" @click="this.onBonusView(courier)">
                View Bonuses
                <v-icon end icon="mdi-open-in-app"></v-icon>
              </v-btn>
            </td>

          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-dialog persistent v-model="isBonusReportOpen" width="800">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline">Bonus Report</v-card-title>
        <v-card-text class="pt-0">
          <table id="bonus-report">
            <tr>
              <th class="text-left">Order Id</th>
              <th class="text-left">Order From</th>
              <th class="text-left">Order To</th>
              <th class="text-left">Did Receive Bonus?</th>
              <th class="text-left">Price</th>
              <th class="text-left">Bonus</th>
            </tr>
            <tbody>
              <tr v-for="entry in orders" :key="entry.orderedBy">
                <td>{{ entry.ticketId }}</td>
                <td>{{ entry.orderedByCustomer.customerName }}</td>
                <td>{{ entry.orderedToCustomer.customerName }}</td>
                <td>{{ entry.onTimeBonus ?? 'no' }}</td>
                <td>${{ entry.quotedPrice }}</td>
                <td>$ {{ entry.bonus }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5">Total Bonus</td>
                <td>$ {{ getTotal(orders) }}</td>
              </tr>
            </tfoot>
          </table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="secondary" @click="closeBonusView()">Close</v-btn>
          <v-btn variant="flat" color="primary" @click="generateBonusReportPDF()">
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


export default {
  data() {
    return {
      couriers: [],
      courier: {},
      orders: {},
      isBonusReportOpen: false,
    }
  },
  async created() {
    await AdminServices.getCouriers().then(data => {
      this.couriers = data.data

    })
  },
  methods: {
    async onBonusView(courier) {
      this.courier = courier;
      await AdminServices.getCourierBonus(courier.courierNumber).then(data => {
        this.orders = data.data
        this.orders.forEach(order => {
          if (order.onTimeBonus !== null && order.onTimeBonus !== 'no') {
            order.bonus = Number(order.quotedPrice * 0.1)
          }
          else {
            order.bonus = 0
          }
        });
      })
      this.openBonusView();

    },
    openBonusView() {
      this.isBonusReportOpen = true;
    },
    closeBonusView(){
      this.isBonusReportOpen = false;
    },
    generateBonusReportPDF(){
      const doc = new jsPDF()
      autoTable(doc, { html: '#bonus-report', useCss: true });
      doc.text(`${this.courier.courierName}'s Bonus Report:`, 10, 10)
      doc.save(`bonus-report-courier-${this.courier.courierName}.pdf`)
    },
    getTotal(records){
      return records.reduce(((a,b) => a+b.bonus), 0)
    }
  },

}
</script>
<style>
#bonus-report {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#bonus-report td, #bonus-report th {
  border: 1px solid #ddd;
  padding: 8px;
}

#bonus-report tr:nth-child(even){background-color: #f2f2f2;}

#bonus-report tr:hover {background-color: #ddd;}

#bonus-report th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(83, 83, 255);
  color: white;
}
</style>