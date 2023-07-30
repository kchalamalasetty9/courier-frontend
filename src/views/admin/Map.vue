<template>
  <v-container style="max-width: 100%;">
    <v-row>
      <v-col cols="5">
        <div class="text-h6 pa-2">Vertices
          <span style="float: right;">
            <v-btn @click="this.openAddVertex()">
              Add Vertex
              <v-icon end icon="mdi-plus"></v-icon>
            </v-btn>
          </span>

        </div>
        <v-table height="500px">
          <thead>
            <tr>
              <th class="text-left">
                Vertices
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vertice in vertices" :key="vertice.name">
              <td>{{ vertice.name }}</td>
              <td>
                <div class="text-center">
                  <v-btn class="ma-2" color="grey" @click="this.openEditVertex(vertice)">
                    Edit
                    <v-icon end icon="mdi-pencil"></v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" @click="this.onDeleteVertex(vertice.name)">
                    Delete
                    <v-icon end icon="mdi-trash-can"></v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>

      </v-col>
      <v-col cols="7" style="border-left: 0.5px #999 solid;">
        <div class="text-h6 pa-2">Edges
          <span style="float: right;">
            <v-btn @click="this.openAddEdge()">
              Add Edge
              <v-icon end icon="mdi-plus"></v-icon>
            </v-btn>
          </span>
        </div>
        <v-table height="500px">
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Source Vertex
              </th>
              <th class="text-left">
                Destination Vertex
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edge in edges" :key="edge.id">
              <td>{{ edge.name }}</td>
              <td>{{ edge.sourceVertexId }}</td>
              <td>{{ edge.destinationVertexId }}</td>
              <td>
                <div class="text-center">
                  <v-btn class="ma-2" color="grey" @click="this.openEditEdge(edge)">
                    Edit
                    <v-icon end icon="mdi-pencil"></v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" @click="this.onDeleteEdge(edge.id)">
                    Delete
                    <v-icon end icon="mdi-trash-can"></v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog persistent v-model="isAddOpenVertex" width="800">
    <v-card class="rounded-lg elevation-5">
      <v-card-title class="headline mb-2">Add Vertex</v-card-title>
      <v-card-text>
        <v-text-field v-model="vertex.name" label="Name" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="secondary" @click="closeAddVertex()">Close</v-btn>
        <v-btn variant="flat" color="primary" @click="addVertex()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog persistent v-model="isEditOpenVertex" width="800">
    <v-card class="rounded-lg elevation-5">
      <v-card-title class="headline mb-2">Add Vertex</v-card-title>
      <v-card-text>
        <v-text-field v-model="vertex.name" label="Name" disabled></v-text-field>
        <v-text-field v-model="vertex.newName" label="New Name" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="secondary" @click="closeEditVertex()">Close</v-btn>
        <v-btn variant="flat" color="primary" @click="updateVertex()">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog persistent v-model="isAddOpenEdge" width="800">
    <v-card class="rounded-lg elevation-5">
      <v-card-title class="headline mb-2">Add Edge</v-card-title>
      <v-card-text>
        <v-text-field v-model="edge.name" label="Name" required></v-text-field>
        <v-select v-model="edge.sourceVertexId" :items="vertices" label="Source Vertex" required item-title="name"
          item-value="name"></v-select>
        <v-select v-model="edge.destinationVertexId" :items="vertices" label="Destination Vertex" required
          item-title="name" item-value="name"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="secondary" @click="closeAddEdge()">Close</v-btn>
        <v-btn variant="flat" color="primary" @click="addEdge()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog persistent v-model="isEditOpenEdge" width="800">
    <v-card class="rounded-lg elevation-5">
      <v-card-title class="headline mb-2">Add Entry</v-card-title>
      <v-card-text>
        <v-text-field v-model="edge.name" label="Name" required></v-text-field>
        <v-select v-model="edge.sourceVertexId" :items="vertices" label="Source Vertex" required item-title="name"
          item-value="name"></v-select>
        <v-select v-model="edge.destinationVertexId" :items="vertices" label="Destination Vertex" required
          item-title="name" item-value="name"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="secondary" @click="closeEditEdge()">Close</v-btn>
        <v-btn variant="flat" color="primary" @click="updateEdge()">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import AdminServices from '../../services/AdminServices'


export default {
  data() {
    return {
      vertices: [],
      edges: [],
      vertex: {},
      edge: {},
      isAddOpenVertex: false,
      isAddOpenEdge: false,
      isEditOpenVertex: false,
      isEditOpenEdge: false,
    }
  },
  async created() {
    this.reloadData()
  },
  methods: {
    openAddVertex() {
      this.vertex = {}
      this.isAddOpenVertex = true
    },
    openAddEdge() {
      this.edge = {}
      this.isAddOpenEdge = true
    },
    openEditVertex(vertex) {
      this.isEditOpenVertex = true
      this.vertex = vertex
    },
    openEditEdge(edge) {
      this.isEditOpenEdge = true
      this.edge = edge
    },
    closeAddVertex() {
      this.isAddOpenVertex = false
    },
    closeAddEdge() {
      this.isAddOpenEdge = false
    },
    closeEditVertex() {
      this.isEditOpenVertex = false
    },
    closeEditEdge() {
      this.isEditOpenEdge = false
    },
    async addVertex() {
      console.log(this.vertex);
      await AdminServices.addVertex(this.vertex);
      this.reloadData()
      this.closeAddVertex();
    },
    async addEdge() {
      console.log(this.edge);
      this.closeAddEdge();
      await AdminServices.addEdge(this.edge);
      this.reloadData()
      this.closeAddEdge();
    },
    async updateVertex() {
      console.log(this.vertex);
      await AdminServices.updateVertex(this.vertex);
      this.reloadData()
      this.closeEditVertex();
    },
    async updateEdge() {
      console.log(this.edge);
      this.closeAddEdge();
      await AdminServices.updateEdge(this.edge);
      this.reloadData()
      this.closeEditEdge();
    },
    async onDeleteVertex(name) {
      await AdminServices.deleteVertex(name);
      this.vertices = this.vertices.filter(x => x.name !== name)
      this.reloadData()
    },
    async onDeleteEdge(id) {
      await AdminServices.deleteEdge(id);
      this.vertices = this.vertices.filter(x => x.id !== id)
      this.reloadData()
    },
    async reloadData() {
      await AdminServices.getMap().then(data => {

        this.vertices = data.data.vertices
        this.edges = data.data.edges
      })
    }
  },
}
</script>