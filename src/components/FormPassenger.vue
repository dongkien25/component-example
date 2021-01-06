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

      <div class="form-group">
        <label class="form-label" for="">Airline :</label>
        <v-btn @click="dialogListAirline = true;getListAirline()" class="pick-airline-btn"> Select an airline </v-btn>
        <v-dialog v-model="dialogListAirline" hide-overlay width="800">
          <v-card>
            <v-card-title class="dialog-title">List of Airline</v-card-title>
            <v-divider></v-divider>
            <v-item-group class="wrap-list-airline" mandatory>
                <v-row>
                    <v-col v-for="(airline,index) in listAirline" :key="index" cols="12" md="4">
                        <v-item>
                            <img class="img-logo" :src="`${airline.logo}`" height="150"/>
                        </v-item>
                    </v-col>
                </v-row>
            </v-item-group>
            <v-card-actions class="confirm-btn">
              <v-btn color="primary"> Select </v-btn>
              <v-btn color="error" @click="dialogListAirline = false"> Close </v-btn>
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
    dialogListAirline =  false;
    listAirline = [];
    selected = {};
    onSubmit() {

    }
    getListAirline(){
        axios.get(urlGet)
        .then((response => {
            this.listAirline = response.data.slice(0,6);
            console.log(this.listAirline)
        }))
    }

}
</script>
<style>
.img-logo {
  width: 150px;
  height: 100px;
  object-fit: contain;
}
</style>