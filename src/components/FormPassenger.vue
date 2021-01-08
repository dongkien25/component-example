<template>
  <v-form ref="form" v-model="valid" class="form" lazy-validation>
    <v-text-field
      v-model="name"
      counter="10"
      :rules="nameRules"
      label="Name"
      clearable
      outlined
    ></v-text-field>

    <v-text-field
      v-model="country"
      :rules="[(v) => !!v || 'Item is required']"
      label="Country"
      outlined
    ></v-text-field>
     <v-text-field v-if="selected"
      :value="selectedAirline.name"
      label="Airline name"
      outlined
      readonly
      dense
      ></v-text-field>
      <span v-else>Please select an Airline</span>
    <div v-if="selected" class="imgLogo">
      <img :src="selectedAirline.logo" alt="">
    </div>
    
    <v-col cols="12" sm="12" md="12">
      <v-btn @click="showListAirline" class="pick-airline-btn">
        Select an airline
      </v-btn>
    </v-col>
    <v-dialog
      class="wrap-list-airline"
      v-model="dialogListAirline"
      hide-overlay
      width="400"
    >
      <v-card>
        <v-card-title class="dialog-title">List of Airline</v-card-title>
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
                  @click="selectLogo(airline)"
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

    <v-btn color="error" class="mr-16" @click="reset"> Reset Form </v-btn>
    <!-- <v-spacer></v-spacer> -->
    <v-btn :disabled="!valid" color="primary" class="ml-16" @click="validate()">
      Submit
    </v-btn>
  </v-form>
  
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Airline } from './AirlineTable.vue'
import axios from 'axios'

const urlGet = "https://api.instantwebtools.net/v1/";
@Component
export default class ValidateForm extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
  valid = true;
  selected = false;
  dialogListAirline = false;
  listAirline: Airline[] = [];
  selectedAirline! :Airline;
  name = "";
  country = "";
  nameRules = [
    (v:string) => !!v || "Name is required",
    (v:string) => (v && v.length <= 10) || "Name must be less than 10 characters",
  ];
  $refs!: {
    form: HTMLFormElement
  }
  validate() {
    this.$refs.form.validate();
  }
  reset() {
    this.$refs.form.reset();
    this.selected = false
  }
  resetValidation() {
    this.$refs.form.resetValidation();
  }
  mounted() {
    axios.get<Airline[]>(`${urlGet}airlines`).then((response) => {
      this.listAirline = response.data;
    });
  }
  showListAirline() {
    this.dialogListAirline = true;
  }
  selectLogo(id:Airline) {
    this.selectedAirline = id;
    this.selected = true;
    this.dialogListAirline = false;
  }
}
</script>
<style scoped>
.imgLogo {
  margin: auto;
  width: 80%;
  height: 100px;
}
.imgLogo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>