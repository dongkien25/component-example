<template>
  <div class="form-passenger">
    <form class="form" id="form-passenger" action="">
      <h2 class="heading">Form for Passenger</h2>
      <div class="form-group" @submit.prevent="onSubmit">
        <label class="form-label" for="">Name :</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Trips :</label>
        <input
          id="trips"
          v-model="trips"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>
      <div class="form-group"></div>
      <div class="form-group">
        <label class="form-label" for="">Airline :</label>
        <v-btn @click="showListAirline()" class="pick-airline-btn">
          Select an airline
        </v-btn>
        <v-dialog v-model="dialogListAirline" hide-overlay width="600">
          <v-card>
            <v-card-title class="dialog-title">List of Airline</v-card-title>
            <v-divider></v-divider>
            <v-item-group class="wrap-list-airline" mandatory>
              <v-row class="ma-0">
                <v-col
                  v-for="(airline, index) in listAirline"
                  :key="index"
                  cols="12"
                  md="4"
                >
                  <v-item class="logo-item">
                    <img
                      @click="selectLogo(airline.id)"
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
      </div>
      <button class="form-submit">Submit</button>
    </form>
  </div>
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
const urlGet = "https://api.instantwebtools.net/v1/airlines";
const axios = require("axios");
@Component
export default class FormPassenger extends Vue {
  name = "";
  trips = "";
  dialogListAirline = false;
  listAirline = [];
  selectedAirline = {};
  onSubmit() {}
  getListAirline() {
    axios.get(urlGet).then((response) => {
      this.listAirline = response.data.slice(0, 6);
      console.log(this.listAirline);
    });
  }
  showListAirline() {
    this.getListAirline();
    this.dialogListAirline = true;
  }
  selectLogo(id) {
    for (let airline of this.listAirline) {
      if (airline.id === id) {
        this.selectedAirline = airline;
      }
    }
    this.dialogListAirline = false;
  }
}
</script>
<style>
.img-logo {
  width: 150px;
  height: 100px;
  object-fit: contain;
}
.form {
  width: 460px;
  min-height: 100px;
  padding: 32px 24px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  margin: 24px;
  align-self: center;
  box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
}
.form-group {
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
}
.form-label {
  text-align: left;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
  text-decoration: none;
}
.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
}
.form-submit:hover {
  background-color: #1ac7b6;
}
#established {
  padding: 0;
}
</style>