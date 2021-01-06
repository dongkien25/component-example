<template>
  <div class="passenger-table">
    <div class="wrap-table-content">
      <h1 class="table-title">Passenger table</h1>
      <router-link class="create-link" to="/form-passenger">
        <v-btn>Create</v-btn>
      </router-link>
      <table id="passengerTable" class="table-data">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>trips</th>
            <th>Logo</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row._id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.trips }}</td>
            <td><img class="img-logo" :src="row.airline.logo" alt="" /></td>
            <td>
              <div class="group-btn">
                <button class="control-btn btn-edit">Edit</button>
                <button
                  @click="
                    dialogDetail = true;
                    getById(row._id);
                  "
                  class="control-btn"
                >
                  Detail
                </button>
                <button
                  @click="dialogDelete = true;"
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
        <span @click="getPage(0, 5)" class="number"> 1 </span>
        <span @click="getPage(1, 5)" class="number"> 2 </span>
      </div>
    </div>
    <v-dialog v-model="dialogDelete" hide-overlay width="500">
      <v-card>
        <v-card-title>Confirm delete</v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deletePassenger()"> Yes </v-btn>
          <v-btn color="primary" @click="dialogDelete = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDetail" hide-overlay width="500">
      <v-card>
        <v-card-title class="dialog-title">Passenger</v-card-title>
        <v-divider></v-divider>

        <div class="detail-content">
          <!-- <li v-for="(a,index) in airline" :key="index">{{a}} : {{airline[a]}}</li> -->
          <div class="detail-item">
            <div class="item-title">ID</div>
            <div class="item-content">{{ passenger._id }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Name</div>
            <div class="item-content">{{ passenger.name }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Trips</div>
            <div class="item-content">{{ passenger.trips }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Logo</div>
            <div class="item-content">
              <img class="img-logo" v-if="passenger.airline" :src="passenger.airline.logo"  alt="" />
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
const urlGet = "https://api.instantwebtools.net/v1/passenger";
const axios = require("axios");
@Component
export default class PassengerTale extends Vue {
  dialogDelete = false;
  dialogDetail = false;
  rows = [];
  cols = [];
  passenger = {};
  deleteId = 0;
//   elementPerPage = 10;
//   currentPage = 1;
  getPage(page, size) {
    axios.get(`${urlGet}?page=${page}&size=${size}`).then((response) => {
      this.rows = response.data.data;
      
      //   this.cols = Object.keys(this.rows[0]);
      //   console.log('cols',this.rows[0])
    });
  }
  getById(id = this.startId) {
    axios.get(`${urlGet}/${id}`)
    .then((response) => {
      this.passenger = response.data;
      console.log(this.passenger.airline.logo)
    });
  }
  mounted() {
    axios.get(`${urlGet}?page=0&size=40`).then((response) => {
    
      this.rows = response.data.data;
      this.startId = this.rows[0]._id
      console.log(this.startId);
      //   this.cols = Object.keys(this.rows[0]);
      //   console.log('cols',this.rows[0])
    });
  }
  deletePassenger(id){
      axios.delete(`${urlGet}/${id}`)
      .then(response => {
          console.log(response)
          if(response.status === 200){
              console.log('Delete success')
          }
      })
      .catch(error => {
          console.log(error);
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
