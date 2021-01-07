<template>
  <div class="data-table">
    <div class="wrap-table-content">
      <h1 class="table-title">{{ title }} {{ selected }} table</h1>
      <router-link class="create-link" to="/form-passenger">
        <v-btn>Create</v-btn>
      </router-link>
      <table id="" class="table-data">
        <thead>
          <tr>
            <slot name="head"></slot>
          </tr>
        </thead>
        <tbody>
            <slot name="body"></slot>
          <!-- <tr v-for="row in rows" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.country }}</td>
            <td><img class="img-logo" :src="row.logo" alt="" /></td>
            <td>
              <div class="group-btn">
                <button class="control-btn btn-edit">Edit</button>
                <button @click="openDetailDialog(row.id)" class="control-btn">
                  Detail
                </button>
                <button
                  @click="dialogDelete = true"
                  class="control-btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </td>
            <td v-for="key in row" :key="key">{{key}}</td>
          </tr> -->
        </tbody>
      </table>
      <div class="pagination">
        <!-- <span @click="" class="number"> 1 </span>
                <span @click:="" class="number"> 2 </span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
const airlineUrl = "https://api.instantwebtools.net/v1/airlines";
const passengerUrl = "https://api.instantwebtools.net/v1/passenger";
import axios from "axios";

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
}

interface ResponsePassenger {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}
@Component
export default class DataTable extends Vue {
  @Prop() readonly title!: string;
  @Prop() selected!: "airline" | "passenger";
  allData = [];
  dataItem = {};
  rows: Airline[] | Passenger[] = [];
//   mounted() {
//     if (this.selected === "airline") {
//       axios.get<Airline[]>(airlineUrl).then((response) => {
//         this.rows = response.data;
//         console.log(typeof this.rows);
//       });
//     } else {
//       axios
//         .get<ResponsePassenger>(`${passengerUrl}?page=0&size=10`)
//         .then((response) => {
//           this.rows = response.data.data;
//         });
//     }
//   }
  get cols() {
    if (this.selected === "airline")
      return ["id", "name", "country", "logo", "control"];
    return ["id", "name", "trips", "logo", "control"];
  }

  openDetailDialog(id: number) {
    console.log(id);
  }
}
</script>