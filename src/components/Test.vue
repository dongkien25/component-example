<template>
  <div class="">
    <DataTable title="Hello" selected="passenger">
      <template v-slot:head>
        <th>id</th>
        <th>name</th>
        <th>trips</th>
        <th>logo</th>
        <th>control</th>
      </template>
      <template v-slot:body>
        <tr></tr>
      </template>
    </DataTable>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import DataTable from "../components/DataTable.vue";
import axios from "axios";

const urlGet = "https://api.instantwebtools.net/v1/passenger";
interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: object;
}
interface ResponsePassenger {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}
@Component({
  components: {
    DataTable,
  },
})
export default class Test extends Vue {
  dialogDelete = false;
  dialogDetail = false;
  rows = [];
  cols = [];
  passenger = {};
  deleteId = 0;
  getPage(page: number, size: number) {
    axios.get(`${urlGet}?page=${page}&size=${size}`).then((response) => {
      this.rows = response.data.data;
    });
  }
  getById(id: string) {
    axios.get(`${urlGet}/${id}`).then((response) => {
      this.passenger = response.data;
    });
  }
  mounted() {
    axios.get(`${urlGet}?page=0&size=40`).then((response) => {
      this.rows = response.data.data;
      //   this.cols = Object.keys(this.rows[0]);
      //   console.log('cols',this.rows[0])
    });
  }
  deletePassenger(id: string) {
    axios
      .delete(`${urlGet}/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Delete success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
// title = {};
</script>