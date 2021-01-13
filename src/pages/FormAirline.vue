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
        counter="30"
        :rules="nameRules"
        label="Name"
        clearable
        outlined
      ></v-text-field>

      <v-text-field
        v-model="country"
        :rules="requiredRules"
        label="Country"
        outlined
      ></v-text-field>
      <v-file-input
        accept="image/*"
        label="Select a logo"
        v-model="logo"
      ></v-file-input>

      <v-text-field
        v-model="slogan"
        :rules="requiredRules"
        label="slogan"
        outlined
      ></v-text-field>

      <v-text-field
        v-model="head_quaters"
        :rules="requiredRules"
        label="Head Quaters"
        outlined
      ></v-text-field>

      <v-text-field
        v-model="website"
        :rules="webRules"
        label="Website"
        outlined
      ></v-text-field>

      <v-col id="established" cols="12" sm="12" md="12">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              :rules="requiredRules"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              solo
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
            @input="menu = false"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
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
import { State, Mutation, Action } from "vuex-class";
import Airline from "@/models/AirlineModel";
import rules from "@/modules/rules";
import DgSubmitSuccess from "@/components/DialogSubmitSuccess.vue";
@Component({
  components: {
    DgSubmitSuccess,
  },
})
export default class FormAirline extends Vue {
  dgSubmitSuccess = false;
  date = new Date().toISOString().substr(0, 10).toString();
  airline!: Airline;
  menu = false;
  valid = true;
  name = "";
  country = "";
  head_quaters = "";
  slogan = "";
  website = "";
  logo = [];
  email = "";
  established = "";
  nameRules = rules.nameRules;
  webRules = rules.webRules;
  requiredRules = rules.required;

  @State("status") status?: number;
  @Action("addAirline") addAirline: any;
  $refs!: {
    form: HTMLFormElement;
  };
  onSubmit() {
    this.$refs.form.validate();
    this.airline = {
      name: this.name,
      country: this.country,
      logo: this.logo.toString(),
      slogan: this.slogan,
      head_quaters: this.head_quaters,
      website: this.website,
      established: this.date,
    };
    console.log("date: " + this.date);
    this.addAirline(this.airline);
    if (this.status === 200) {
      this.dgSubmitSuccess = true;
    }
  }
  reset() {
    this.$refs.form.reset();
  }
  resetValidation() {
    this.$refs.form.resetValidation();
  }
}
</script>   