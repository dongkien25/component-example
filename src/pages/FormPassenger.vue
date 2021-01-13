<template>
  <div class="">
    <v-form
      ref="form"
      v-model="valid"
      class="form"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="name"
        counter="50"
        :rules="nameRules"
        label="Name"
        clearable
        outlined
      ></v-text-field>

      <v-text-field
        v-model="trips"
        :rules="requiredRules"
        label="Trips"
        outlined
      ></v-text-field>
      <v-text-field
        v-if="selected"
        :value="selectedAirline.name"
        label="Airline name"
        outlined
        readonly
        dense
      ></v-text-field>
      <span v-else>Please select an Airline</span>
      <div v-if="selected" class="imgLogo">
        <img :src="selectedAirline.logo" alt="" />
      </div>

      <v-col cols="12" sm="12" md="12">
        <v-btn @click="showListAirline" class="pick-airline-btn">
          Select an airline
        </v-btn>
      </v-col>
      <DialogListAirline
        :dialogListAirline="dgListAirline"
        @closeDgListAirline="dgListAirline = false"
        @select-logo="selectLogo"
      ></DialogListAirline>

      <v-btn color="error" class="mr-16" @click="reset"> Reset Form </v-btn>
      <!-- <v-spacer></v-spacer> -->
      <v-btn :disabled="!valid" color="primary" class="ml-16" type="submit">
        Submit
      </v-btn>
    </v-form>
    <DgSubmitSuccess
      :dgSubmitSuccess="dgSubmitSuccess"
      @close-dg-submit-success="dgSubmitSuccess = false"
    ></DgSubmitSuccess>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Airline from "@/models/AirlineModel";
import rules from "@/modules/rules";
import { State, Mutation, Action } from "vuex-class";
import { LoadingType } from "@/modules/store";
import Passenger from "@/models/PassengerModel";
import DgSubmitSuccess from "@/components/DialogSubmitSuccess.vue";
import DialogListAirline from "@/components/DialogListAirline.vue";
@Component({
  components: {
    DgSubmitSuccess,
    DialogListAirline,
  },
})
export default class ValidateForm extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
  valid = true;
  selected = false;
  dgListAirline = false;
  dgSubmitSuccess = false;
  selectedAirline!: Airline;
  name = "";
  trips = "";
  nameRules = rules.nameRules;
  requiredRules = rules.required;
  passenger = new Passenger();
  @State("isLoading") isLoading!: LoadingType;
  @State("airlineList") listAirlines!: Airline[];
  @State("status") status?: number;
  @Mutation("getListAirline") getAllAirline!: Function;
  @Action("fetchAirlines") fetchAirlines!: any;
  @Action("addPassenger") addPassenger: any;

  $refs!: {
    form: HTMLFormElement;
  };
  onSubmit() {
    this.$refs.form.validate();
    if (this.selectedAirline) {
      this.passenger = {
        name: this.name,
        trips: parseInt(this.trips),
        airline: this.selectedAirline.id,
      };
    }
    console.log("newPassenger", this.passenger);
    this.addPassenger(this.passenger);
    if (this.status === 200) {
      this.dgSubmitSuccess = true;
    }
  }
  reset() {
    this.$refs.form.reset();
    this.selected = false;
  }
  resetValidation() {
    this.$refs.form.resetValidation();
  }
  mounted() {
    this.fetchAirlines();
  }
  showListAirline() {
    this.dgListAirline = true;
  }
  selectLogo(airline: Airline) {
    this.selectedAirline = airline;
    this.selected = true;
    this.dgListAirline = false;
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

