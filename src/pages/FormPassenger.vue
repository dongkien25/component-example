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
        <div v-if="isLoading === 'loading'" class="spinner-load">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
         </div>
        <v-item-group v-else mandatory>
          <v-row class="pl-5 ma-0">
            <v-col
              v-for="(airline, index) in listAirlines"
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
import Airline from '@/models/AirlineModel'
import rules from "@/modules/rules"
import { State, Mutation, Action } from "vuex-class";
import { LoadingType } from "@/modules/store";


@Component
export default class ValidateForm extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
  valid = true;
  selected = false;
  dialogListAirline = false;
  selectedAirline! :Airline;
  name = "";
  country = "";
  nameRules = rules.nameRules;
  @State("isLoading") isLoading!: LoadingType;
  @State("airlineList") listAirlines!: Airline[];
  @Mutation("getListAirline") getAllAirline!: Function;
  @Action("fetchAirlines") fetchAirlines!: any;
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
    this.fetchAirlines()
  }
  showListAirline() {
    this.dialogListAirline = true;
  }
  selectLogo(airline:Airline) {
    this.selectedAirline = airline;
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