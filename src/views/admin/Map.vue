<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <div class="text-h6">Vertices</div>
        <v-table  height="500px">
          <thead>
            <tr>
              <th class="text-left">
                Vertices
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vertice in vertices" :key="vertice.name">
              <td>{{ vertice.name }}</td>
            </tr>
          </tbody>
        </v-table>

      </v-col>
      <v-col cols="9" style="border-left: 0.5px #999 solid;">
        <div class="text-h6">Edges</div>
        <v-table  height="500px">
          <thead>
            <tr>
              <th class="text-left">
                Source Vertex
              </th>
              <th class="text-left">
                Destination Vertex
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edge in edges" :key="edge.id">
              <td>{{ edge.sourceVertexId }}</td>
              <td>{{ edge.destinationVertexId }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AdminServices from '../../services/AdminServices'


export default {
  data() {
    return {
      vertices: [],
      edges: []
    }
  },
  async created() {
    await AdminServices.getMap().then(data => {
      
      this.vertices = data.data.vertices
      this.edges = data.data.edges
    })
  },
  methods: {
  },
}
</script>