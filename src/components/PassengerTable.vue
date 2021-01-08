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
          <tr v-for="row in rows" :key="row._id">
            <td>{{ row._id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.trips }}</td>
            <td><img class="img-logo" :src="row.airline.logo" alt="" /></td>
            <td>
              <div class="group-btn">
                <button
                  class="control-btn btn-edit"
                  @click="getDialogEdit(row._id)"
                >
                  Edit
                </button>
                <button @click="getDetail(row._id)" class="control-btn">
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
          <v-btn color="error" @click="deletePassenger(passenger._id)"> Yes </v-btn>
          <v-btn color="primary" @click="dialogDelete = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDetail" hide-overlay width="500">
      <v-card v-if="passenger">
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
              <img
                class="img-logo"
                v-if="passenger.airline"
                :src="passenger.airline.logo"
                alt=""
              />
            </div>
          </div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogDetail = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" hide-overlay width="500">
      <v-card v-if="passenger">
        <v-card-title class="dialog-title">Edit Passenger</v-card-title>
        <div class="">
          <v-form ref="form" v-model="valid" class="form" lazy-validation>
            <v-text-field :value="passenger.name" solo clearable></v-text-field>

            <v-text-field
              :rules="[(v) => !!v || 'Item is required']"
              :value="passenger.trips"
              solo
              clearable
            ></v-text-field>
            <div class="">
              <img v-if="selected" :src="selectedAirline" />
              <img v-else :src="passenger.airline.logo" />
            </div>

            <v-btn @click="showListAirline()" class="pick-airline-btn">
              Select an airline
            </v-btn>
            <v-dialog
              class="wrap-list-airline"
              v-model="dialogListAirline"
              hide-overlay
              width="400"
            >
              <v-card>
                <v-card-title class="dialog-title"
                  >List of Airline</v-card-title
                >
                <v-divider></v-divider>
                <v-item-group mandatory>
                  <v-row class="pl-5 ma-0">
                    <v-col
                      v-for="(airline, index) in listAirline"
                      :key="index"
                      cols="12"
                      md="6"
                    >
                      <v-item class="logo-item">
                        <img
                          @click="selectLogo(airline.logo)"
                          class="img-logo"
                          :src="`${airline.logo}`"
                          height="150"
                        />
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>
                <v-card-actions class="confirm-btn">
                  <v-btn color="primary"> Select </v-btn>
                  <v-btn color="error" @click="dialogListAirline = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-form>
        </div>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-16"
            @click="onSubmit()"
          >
            Submit
          </v-btn>
          <v-dialog v-model="dialogConFirmEdit" hide-overlay width="500">
      <v-card>
        <v-card-title>Confirm Edit</v-card-title>
        <v-card-text>Do you want to update this passenger?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" > Yes </v-btn>
          <v-btn color="primary" @click="dialogConFirmEdit = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          
          <v-spacer></v-spacer>
          <v-btn color="error" class="ml-16" @click="dialogEdit = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Airline } from "./AirlineTable.vue";

export interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
}
export interface ResponsePassenger {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}
const urlGet = "https://api.instantwebtools.net/v1/";
const axios = require("axios");
@Component
export default class PassengerTale extends Vue {
  dialogDelete = false;
  dialogDetail = false;
  dialogEdit = false;
  selected = false;
  dialogConFirmEdit = false;
  dialogListAirline = false;
  selectedAirline = "";
  airline!: Airline;
  listAirline: Airline[] = [];
  valid = true;
  rows: Passenger[] = [];
  cols = [];
  passenger!: Passenger;
  deleteId = 0;
  //   elementPerPage = 10;
  //   currentPage = 1;
  getPage(page: number, size: number) {
    axios
      .get(`${urlGet}passenger?page=${page}&size=${size}`)
      .then((response: any) => {
        this.rows = response.data.data;

        //   this.cols = Object.keys(this.rows[0]);
        //   console.log('cols',this.rows[0])
      });
  }
  getById(id: string) {
    // axios.get(`${urlGet}/${id}`)
    // .then((response) => {
    //   this.passenger = response.data;
    //   console.log(this.passenger.airline.logo)
    // });
    for (let row of this.rows) {
      if (row._id === id) {
        this.passenger = row;
        this.airline = row.airline;
      }
    }
  }
  showListAirline() {
    this.dialogListAirline = true;
  }
  mounted() {
    axios.get(`${urlGet}passenger?page=0&size=40`).then((response: any) => {
      this.rows = response.data.data;
      //   this.cols = Object.keys(this.rows[0]);
      //   console.log('cols',this.rows[0])
    });
    axios.get(`${urlGet}airlines`).then((response: any) => {
      this.listAirline = response.data;
    });
  }
  deletePassenger(id: string){
      axios.delete(`${urlGet}/${id}`)
      .then((response:any) => {
          console.log(response)
          if(response.status === 200){
              console.log('Delete success')
          }
      })
      .catch((error:string) => {
          console.log(error);
      })
  }
  getDetail(id: string) {
    this.getById(id);
    this.dialogDetail = true;
  }
  getDialogEdit(id: string) {
    this.getById(id);
    this.dialogEdit = true;
    console.log(this.passenger);
  }
  selectLogo(logo: string) {
    this.selectedAirline = logo;
    this.dialogListAirline = false;
    this.selected = true;
  }
  onSubmit() {
    this.dialogConFirmEdit = true
  }
}
</script>

<style lang="scss" scope>
.pick-airline-btn {
  margin-top: 30px;
}
.logo-item:hover {
  border: 2px solid #6495ed;
  cursor: pointer;
}
</style>
