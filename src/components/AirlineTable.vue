<template>
  <div class="airline-table">
    <div class="wrap-table-content">
      <h1 class="table-title">Airline table</h1>
      <router-link class="create-link" to="/form-airline">
        <v-btn class="btn-create">Create</v-btn>
      </router-link>
      <table class="table-data" id="airlineTable">
        <thead>
          <tr>
            <th v-for="(col, index) in cols" :key="index">{{ col }}</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.country }}</td>
            <td><img class="img-logo" :src="row.logo" alt="" /></td>
            <td>
              <div class="group-btn">
                <button class="control-btn btn-edit">Edit</button>
                <button
                  @click="
                    dialogDetail = true;
                    getById(row.id);
                  "
                  class="control-btn"
                >
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
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <span
          class="number"
          v-for="n in totalPage"
          :key="n"
          @click="getAirline(n)"
          >{{ n }}</span
        >
      </div>
    </div>
    <v-dialog v-model="dialogDelete" hide-overlay width="300">
      <v-card>
        <v-card-title class="dialog-title">Are you sure?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions class="confirm-btn">
          <v-btn color="error"> Yes </v-btn>
          <v-btn color="primary" @click="dialogDelete = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDetail" hide-overlay width="500">
      <v-card>
        <v-card-title class="dialog-title">Airline</v-card-title>
        <v-divider></v-divider>

        <div class="detail-content">
          <!-- <li v-for="(a,index) in airline" :key="index">{{a}} : {{airline[a]}}</li> -->
          <div class="detail-item">
            <div class="item-title">ID</div>
            <div class="item-content">{{ airline.id }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Name</div>
            <div class="item-content">{{ airline.name }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Country</div>
            <div class="item-content">{{ airline.country }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Logo</div>
            <div class="item-content">
              <img class="img-logo" :src="airline.logo" alt="" />
            </div>
          </div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogDetail = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
const urlGet = "https://api.instantwebtools.net/v1/airlines";
const axios = require("axios");
@Component
export default class AirlineTable extends Vue {
  dialogDelete = false;
  dialogDetail = false;
  rows = [];
  cols = [];
  airline = {};
  totalPage = 0;
  size = 50;
  numPage() {}
  getById(id) {
    axios.get(`${urlGet}/${id}`).then((response) => {
      this.airline = response.data;
      console.log("airline", this.airline);
    });
  }
  getAirline(currentPage) {
    axios.get(urlGet).then((response) => {
      let rowData = response.data;
      let start = (currentPage - 1) * this.size;
      let end = start + this.size;
      this.totalPage = Math.ceil(response.data.length / this.size);
      console.log("totalpage:", this.totalPage);
      this.rows = response.data.slice(start, end);

      this.cols = Object.keys(this.rows[0]);
      this.cols = this.cols.slice(0, 4);
    });
  }
  totalAirline = 10;
  mounted() {
    this.getAirline(1);
  }
}
</script>

<style>
.wrap-table-content {
  display: flex;
  flex-direction: column;
  width: 1100px;
}
.table-title {
  text-align: center;
  text-transform: capitalize;
}
.create-link {
    text-decoration: none;
    align-self: flex-start;
    margin-left: 50px;
    width: 90px;
}

.table-data {
  font-family: "Open Sans", sans-serif;
  width: 1000px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
  align-self: center;
}

.table-data th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

.table-data td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
.table-data td:last-child {
  border-right: none;
}
/* .table-data tbody tr:nth-child(2n) td {
  background: #d4d8f9;
} */
.table-data tbody tr {
  border-bottom: 1px solid #44475c;
}
.control-btn {
  margin: auto;
  color: white;
  margin-top: 5px;
  background-color: #008cba;
  width: 50px;
  height: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 #888;
  border: 1px solid #7d82a8;
}
.control-btn:hover {
  margin: auto;
  color: white;
  margin-top: 5px;
  width: 55px;
  height: 30px;
  box-shadow: 2px 3px 3px 0px #888;
  border: 2px solid #7d82a8;
}
.img-logo {
  width: 150px;
  height: 100px;
  object-fit: contain;
}

/* dialog */
.group-btn {
  display: flex;
  flex-direction: column;
}
.btn-delete {
  background-color: #f44336;
}
.btn-edit {
  background-color: #4caf50;
}
.confirm-btn {
  justify-content: space-around;
}
.dialog-title {
  justify-content: center;
}
.wrap-detail-content {
  padding-left: 0;
}
.detail-content ul li {
  list-style: none;
  padding: 5px;
  padding-left: 0;
  margin-left: 0;
  text-transform: capitalize;
}

.detail-item {
  display: flex;
}
.item-title {
  width: 150px;
  padding: 5px;
  font-weight: 500;
  color: #0000cd;
  padding-left: 15px;
}
.item-content {
  padding: 5px;
}

/* pagination */
.pagination {
  text-align: center;
  width: 1000px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}
</style>
