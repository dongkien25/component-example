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
      :rules ="[ v => !!v || 'Item is required']"
      label="Country"
      outlined
    ></v-text-field>
    <v-file-input
    accept="image/*"
    label="Select a logo"
    
  ></v-file-input>

    <v-text-field
      v-model="Slogan"
      :rules ="[ v => !!v || 'Item is required']"
      label="Slogan"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="head_quaters"
      :rules ="[ v => !!v || 'Item is required']"
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
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                :rules ="[ v => !!v || 'Item is required']"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
    </v-col>
    <v-btn 
    color="error" 
    class="mr-16" 
    @click="reset"> 
    Reset Form 
    </v-btn>
    <!-- <v-spacer></v-spacer> -->
    <v-btn 
    :disabled="!valid" 
    color="primary"
    class="ml-16"
     @click="validate();onSubmit()">
      Submit
    </v-btn>
  </v-form>
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ValidateForm extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
  valid = true;
  name = "";
  nameRules = [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
  ];
  email = "";
  webRules = [
    (v) => !!v || "Website is required",
    (v) => /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(v) || "Website must be valid",
  ];
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