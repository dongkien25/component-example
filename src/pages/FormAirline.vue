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
    <v-file-input accept="image/*" label="Select a logo"></v-file-input>

    <v-text-field
      v-model="Slogan"
      :rules="[(v) => !!v || 'Item is required']"
      label="Slogan"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="head_quaters"
      :rules="[(v) => !!v || 'Item is required']"
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
            :rules="[(v) => !!v || 'Item is required']"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            solo
            clearable
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable @input="menu = false">
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-btn color="error" class="mr-16" @click="reset"> Reset Form </v-btn>
    <!-- <v-spacer></v-spacer> -->
    <v-btn :disabled="!valid" color="primary" class="ml-16" @click="validate()">
      Submit
    </v-btn>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";

import rules from "@/modules/rules";
@Component
export default class ValidateForm extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
  valid = true;
  name = "";
  country = "";
  head_quaters = "";
  Slogan = "";
  website = "";
  email = "";
  nameRules = rules.nameRules;
  webRules = rules.webRules;
  $refs!: {
    form: HTMLFormElement;
  };
  validate() {
    this.$refs.form.validate();
  }
  reset() {
    this.$refs.form.reset();
  }
  resetValidation() {
    this.$refs.form.resetValidation();
  }
}
</script>