<template>
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
        <v-btn color="error" @click="closeDgListAirline"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Airline from "@/models/AirlineModel";
import { LoadingType } from "@/modules/store";
import { State, Mutation, Action } from "vuex-class";
@Component
export default class DialogListAirline extends Vue {
  @State("isLoading") isLoading!: LoadingType;
  @State("airlineList") listAirlines!: Airline[];
  @Mutation("getListAirline") getAllAirline!: Function;
  @Action("fetchAirlines") fetchAirlines!: any;

  @Prop() dialogListAirline!: boolean;

  created() {
    this.fetchAirlines();
  }
  selectLogo(airline: Airline) {
    this.$emit("select-logo",airline);
  }
  closeDgListAirline() {
    this.$emit("closeDgListAirline");
  }
}
</script>