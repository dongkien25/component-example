<template>
  <div class="airline-table">
    <div class="wrap-table-content">
      <h1 class="table-title">Airline table</h1>
      <router-link class="create-link" to="/form-airline">
        <v-btn class="btn-create">Create</v-btn>
      </router-link>
      <table class="table-data" id="airlineTable">
        <thead>
          <tr>
            <!-- <th v-for="(col, index) in cols" :key="index">{{ col }}</th> -->
            <th>id</th>
            <th>name</th>
            <th>country</th>
            <th>logo</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody v-if="isLoading === 'done'">
          <tr v-for="row in listAirlines" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.country }}</td>
            <td><img class="img-logo" :src="row.logo" alt="" /></td>
            <td>
              <div class="group-btn">
                <button
                  class="control-btn btn-edit"
                  @click="displayEditDialog(row.id)"
                >
                  Edit
                </button>
                <button class="control-btn" @click="getDetail(row.id)">
                  Detail
                </button>
                <button
                  @click="dialogDelete = true"
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
        <span
          class="number"
          v-for="n in totalPage"
          :key="n"
          @click="getAirline(n)"
          >{{ n }}</span
        >
      </div>
    </div>
    <DialogDelete
      :dialogDelete="dialogDelete"
      @closeDeleteDialog="dialogDelete = false"
    ></DialogDelete>

    <v-dialog v-model="dialogDetail" hide-overlay width="500">
      <v-card v-if="airline">
        <v-card-title class="dialog-title">Airline</v-card-title>
        <v-divider></v-divider>

        <div class="detail-content">
          <!-- <li v-for="(a,index) in airline" :key="index">{{a}} : {{airline[a]}}</li> -->

          <div class="detail-item">
            <div class="item-title">ID</div>
            <div class="item-content">{{ airline.id }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Name</div>
            <div class="item-content">{{ airline.name }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Country</div>
            <div class="item-content">{{ airline.country }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Logo</div>
            <div class="item-content">
              <img class="img-logo" :src="airline.logo" alt="" />
            </div>
          </div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogDetail = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
              :rules="[(v) => !!v || 'Item is required']"
              :value="airline.country"
              solo
              clearable
            ></v-text-field>
            <v-file-input accept="image/*" label="Select a logo"></v-file-input>

            <v-text-field
              :rules="[(v) => !!v || 'Item is required']"
              :value="airline.slogan"
              solo
              clearable
            ></v-text-field>

            <v-text-field
              :rules="[(v) => !!v || 'Item is required']"
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
                    :rules="[(v) => !!v || 'Item is required']"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    solo
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="selectDate"> OK </v-btn>
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
          <v-btn color="error" class="ml-16" @click="dialogEdit = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import DialogDelete from "./DialogDelete.vue";
const urlGet = "https://api.instantwebtools.net/v1/airlines";
import axios from "axios";
import { LoadingType } from "@/module/store";
import Airline from "@/model/AirlineModel";

const defaultAriline = {
  id: 1,
  name: "",
  country: "",
  logo: "",
  slogan: "",
  head_quaters: "",
  website: "",
  established: "",
};

@Component({
  components: {
    DialogDelete,
  },
})
export default class AirlineTable extends Vue {
  dialogDelete = false;
  dialogDetail = false;
  dialogEdit = false;
  imgUrl = "";
  valid = true;
  
  date = new Date().toISOString().substr(0, 10);
  // rows: Airline[] = [];
  cols: string[] = [];
  airline = defaultAriline;
  name = "";
  country = "";
  @State("isLoading") isLoading!: LoadingType;
  @State("airlineList") listAirlines!: Airline[];
  @Mutation("getListAirline") getAllAirline!: Function;
  @Action("fetchAirlines") fetchAirlines!: any;
  nameRules = [
    (v: string) => !!v || "Name is required",
    (v: string) =>
      (v && v.length <= 20) || "Name must be less than 10 characters",
  ];
  email = "";
  webRules = [
    (v: string) => !!v || "Website is required",
    (v: string) =>
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
        v
      ) || "Website must be valid",
  ];
  totalPage = 0;
  size = 50;
  numPage() {}
  getById(id: number) {
    // const { data } = await axios.get(`${urlGet}/${id}`);
    // this.airline = data;
    for (let row of this.listAirlines) {
      if (row.id === id) {
        this.airline = row;
      }
    }
  }
  getAirline(currentPage: number) {
    axios.get(urlGet).then((response) => {
      let rowData = response.data;
      let start = (currentPage - 1) * this.size;
      let end = start + this.size;
      this.totalPage = Math.ceil(response.data.length / this.size);
      console.log("totalpage:", this.totalPage);
      this.listAirlines = response.data.slice(start, end);

      this.cols = Object.keys(this.listAirlines[0]);
      this.cols = this.cols.slice(0, 4);
    });
  }
  menu:any = this.$refs.menu;
  selectDate() {
    // const menu: any = this.$refs.menu;
    this.menu.save(this.date);
  }
  totalAirline = 10;
  created() {
    // this.getAirline(1);
    this.fetchAirlines();
    console.log("list ariline", this.listAirlines);
  }
  // reset() {
  //   this.$refs.form.reset();
  // }

  onSubmit() {}
  async getDetail(id: number) {
    await this.getById(id);
    this.dialogDetail = true;
  }
  async displayEditDialog(id: number) {
    await this.getById(id);
    this.dialogEdit = true;
  }
}
</script>

<style>
.wrap-table-content {
  display: flex;
  flex-direction: column;
  width: 1100px;
}
.table-title {
  text-align: center;
  text-transform: capitalize;
}
.create-link {
  text-decoration: none;
  align-self: flex-start;
  margin-left: 50px;
  width: 90px;
}

.table-data {
  font-family: "Open Sans", sans-serif;
  width: 1000px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
  align-self: center;
}

.table-data th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

.table-data td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
.table-data td:last-child {
  border-right: none;
}
/* .table-data tbody tr:nth-child(2n) td {
  background: #d4d8f9;
} */
.table-data tbody tr {
  border-bottom: 1px solid #44475c;
}
.control-btn {
  margin: auto;
  color: white;
  margin-top: 5px;
  background-color: #008cba;
  width: 50px;
  height: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 #888;
  border: 1px solid #7d82a8;
}
.control-btn:hover {
  margin: auto;
  color: white;
  margin-top: 5px;
  width: 55px;
  height: 30px;
  box-shadow: 2px 3px 3px 0px #888;
  border: 2px solid #7d82a8;
}
.img-logo {
  width: 150px;
  height: 100px;
  object-fit: contain;
}

.spinner-load {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
/* dialog */
.group-btn {
  display: flex;
  flex-direction: column;
}
.btn-delete {
  background-color: #f44336;
}
.btn-edit {
  background-color: #4caf50;
}
.confirm-btn {
  justify-content: space-around;
}
.dialog-title {
  justify-content: center;
}
.wrap-detail-content {
  padding-left: 0;
}
.detail-content ul li {
  list-style: none;
  padding: 5px;
  padding-left: 0;
  margin-left: 0;
  text-transform: capitalize;
}

.detail-item {
  display: flex;
}
.item-title {
  width: 150px;
  padding: 5px;
  font-weight: 500;
  color: #0000cd;
  padding-left: 15px;
}
.item-content {
  padding: 5px;
}

/* pagination */
.pagination {
  text-align: center;
  width: 1000px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}
</style>
