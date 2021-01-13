<template>
  <div class="passenger-table">
    <div class="wrap-table-content">
      <h1 class="table-title">Passenger table</h1>
      <router-link class="create-link" to="/form-passenger">
        <v-btn>Create</v-btn>
      </router-link>
      <table id="passengerTable" class="table-data">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>trips</th>
            <th>Logo</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="passenger in listPassenger" :key="passenger._id">
            <td>{{ passenger._id }}</td>
            <td>{{ passenger.name }}</td>
            <td>{{ passenger.trips }}</td>
            <td>
              <img
                v-if="passenger.contentAirline"
                class="img-logo"
                :src="passenger.contentAirline.logo"
                alt=""
              />
            </td>
            <td>
              <div class="group-btn">
                <button
                  class="control-btn btn-edit"
                  @click="showDialogEdit(passenger._id)"
                >
                  Edit
                </button>
                <button
                  @click="showDialogDetail(passenger._id)"
                  class="control-btn"
                >
                  Detail
                </button>
                <button
                  @click="showDialogDelte(passenger._id)"
                  class="control-btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading === 'loading'" class="spinner-load">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="pagination">
        <span @click="getPage(0, 5)" class="number"> 1 </span>
        <span @click="getPage(1, 5)" class="number"> 2 </span>
      </div>
    </div>
    <DialogDelete
      :dialogDelete="dialogDelete"
      @closeDeleteDialog="dialogDelete = false"
      @deletePassenger="finishDeletePassenger(passenger._id)"
    ></DialogDelete>

    <DialogDetail
      v-if="listDetailContent"
      :dialogDetail="dialogDetail"
      @closeDetailDialog="dialogDetail = false"
      itemType="Passenger"
      :listDetailTitle="listDetailTitle"
      :listDetailContent="listDetailContent"
    ></DialogDetail>

    <DialogEditPassenger
      :dialogEdit="dialogEdit"
      :passenger="passenger"
      @closeEditDialog="dialogEdit = false"
    ></DialogEditPassenger>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import { LoadingType } from "@/modules/store";
import DialogDelete from "@/components/DialogDelete.vue";
import Passenger from "@/models/PassengerModel";
import Airline from "@/models/AirlineModel";
import ResponsePassenger from "@/models/ResponsePassenger";
import DialogDetail from "@/components/DialogDetail.vue";
import DialogEditPassenger from "@/components/DialogEditPassenger.vue";
// const defaultPassenger = {
//   _id: "",
//   name: "",
//   trips: 0,
//   airline: new Airline(),
// };
// const defaultListDetailContent = ["", "", 0, ""];
type Detail = string | number | undefined;
@Component({
  components: {
    DialogDelete,
    DialogDetail,
    DialogEditPassenger,
  },
})
export default class PassengerTale extends Vue {
  listDetailTitle = ["id", "name", "trips", "airline"];
  listDetailContent?: Detail[];
  dialogDelete = false;
  dialogDetail = false;
  dialogEdit = false;
  airline?: Airline;

  valid = true;

  passenger = new Passenger();

  @State("isLoading") isLoading!: LoadingType;
  @State("passengerList") listPassenger!: Passenger[];
  @State("airlineList") listAirline!: Airline[];
  @Mutation("getListPassenger") getListPassenger!: Function;
  @Mutation("getListAirline") getListAirline!: any;
  @Mutation("removePassenger") removePassenger!: Passenger[];
  @Action("fetchPassenger") fetchPassenger: any;
  @Action("deletePassenger") deletePassenger: any;
  @Action("fetchAirlines") fetchAirlines: any;
  getPage(page: number, size: number) {
    // axios
    //   .get(`${urlGet}passenger?page=${page}&size=${size}`)
    //   .then((response: any) => {
    //     this.listPassenger = response.data.data;
    //   });
  }
  getById(id?: string) {
    for (let passenger of this.listPassenger) {
      if (passenger._id === id) {
        this.passenger = passenger;
        this.airline = passenger.contentAirline;
      }
    }
  }
  created() {
    this.fetchPassenger();
  }
  finishDeletePassenger(id?: string) {
    this.deletePassenger(id);
    this.dialogDelete = false;
  }
  showDialogDetail(id?: string) {
    this.getById(id);
    if (this.airline) {
      this.listDetailContent = [
        this.passenger._id,
        this.passenger.name,
        this.passenger.name,
        this.airline.logo,
      ];
    } else {
      this.listDetailContent = [
        this.passenger._id,
        this.passenger.name,
        this.passenger.name,
      ];
    }

    console.log("listDetail", this.listDetailContent);
    this.dialogDetail = true;
  }
  showDialogEdit(id?: string) {
    this.getById(id);
    this.dialogEdit = true;
    console.log(this.passenger);
  }
  showDialogDelte(id?: string) {
    this.getById(id);
    this.dialogDelete = true;
    console.log("passengerID", this.passenger._id);
  }
}
</script>

<style lang="scss" scope>
.pick-airline-btn {
  margin-top: 30px;
}
.logo-item:hover {
  border: 2px solid #6495ed;
  cursor: pointer;
}
</style>
