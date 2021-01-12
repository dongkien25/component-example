<template>
  <v-dialog v-model="dialogEdit" hide-overlay width="500">
    <v-card v-if="airline">
      <v-card-title class="dialog-title">Edit Airline</v-card-title>
      <div class="">
        <v-form ref="form" v-model="valid" class="form" lazy-validation>
          <v-text-field
            :rules="nameRules"
            :value="airline.name"
            solo
            clearable
          ></v-text-field>

          <v-text-field
            :rules="requiredRules"
            :value="airline.country"
            solo
            clearable
          ></v-text-field>
          <v-file-input accept="image/*" label="Select a logo"></v-file-input>

          <v-text-field
            :rules="requiredRules"
            :value="airline.slogan"
            solo
            clearable
          ></v-text-field>

          <v-text-field
            :rules="requiredRules"
            :value="airline.head_quaters"
            solo
            clearable
          ></v-text-field>

          <v-text-field
            :rules="webRules"
            :value="airline.website"
            solo
            clearable
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
        <v-spacer></v-spacer>
        <v-btn color="error" class="ml-16" @click="closeEditDialog()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import rules from "@/modules/rules";
import Airline from "@/models/AirlineModel";
@Component
export default class EditAirlineDialog extends Vue {
  @Prop() dialogEdit: boolean = false;
  @Prop() airline!: Airline;
  valid = true;
  menu = false;
  date = new Date().toISOString().substr(0, 10);
  nameRules = rules.nameRules;
  webRules = rules.webRules;
  requiredRules = rules.required;
  onSubmit() {}
  closeEditDialog() {
    this.$emit("closeEditDialog");
  }
}
</script>