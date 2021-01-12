<template>
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
            <img v-if="selected" :src="selectedAirline.logo" />
            <img v-else :src="passenger.airline.logo" />
          </div>

          <v-btn @click="showListAirline()" class="pick-airline-btn">
            Select an airline
          </v-btn>
          <DialogListAirline
            :dialogListAirline="dgListAirline"
            @closeDgListAirline="dgListAirline = false"
            @select-logo="selectLogo"
          ></DialogListAirline>
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
        <DialogCofirmEdit
          :dialogConFirmEdit="dialogConFirmEdit"
          @closeConfirmDialog="dialogConFirmEdit = false"
        ></DialogCofirmEdit>

        <v-spacer></v-spacer>
        <v-btn color="error" class="ml-16" @click="closeEditDialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Airline from "@/models/AirlineModel";
import Passenger from "@/models/PassengerModel";
import rules from "@/modules/rules";
import DialogCofirmEdit from "@/components/DialogCofirmEdit.vue";
import DialogListAirline from "@/components/DialogListAirline.vue";
@Component({
  components: {
    DialogCofirmEdit,
    DialogListAirline,
  },
})
export default class DialogEditPassenger extends Vue {
  @Prop() dialogEdit!: boolean;
  @Prop() passenger!: Passenger;

  dialogConFirmEdit = false;
  dgListAirline = false;
  valid = true;
  nameRules = rules.nameRules;
  webRules = rules.webRules;
  requiredRules = rules.required;
  selected = false;
  selectedAirline!: Airline;
  onSubmit() {
    this.dialogConFirmEdit = true;
  }
  showListAirline() {
    this.dgListAirline = true;
  }
  selectLogo(airline: Airline) {
    this.selectedAirline = airline;
    this.selected = true;
    this.dgListAirline = false;
  }

  closeEditDialog() {
    this.$emit("closeEditDialog");
  }
}
</script>