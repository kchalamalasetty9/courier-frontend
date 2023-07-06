<template>
  <div id="element-to-convert">
    <v-container>
      <v-card>
        <v-card-title>
          Monthly Bill
        </v-card-title>
        <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Item
            </th>
            <th class="text-left">
              Quantity
            </th>
            <th class="text-left">
              Price
            </th>
            <th class="text-left">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in billItems"
            :key="item.item"
          >
            <td>{{ item.item }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </v-table>
      </v-card>

      
    </v-container>
  </div>
  <v-btn @click="exportToPDF">Export to PDF</v-btn>
</template>


<script>
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      billItems: [
        { item: 'Item 1', quantity: 2, price: 10, total: 20 },
        { item: 'Item 2', quantity: 3, price: 15, total: 45 },
        { item: 'Item 3', quantity: 1, price: 5, total: 5 }
      ]
    };
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById('element-to-convert'),
        {
          margin: 1,
          filename: "export.pdf",
        }
      );

    },
  }
};
</script>
