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
                <button
                  class="control-btn"
                  @click="displayDetailDialog(row.id)"
                >
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
        <span class="number" v-for="n in totalPage" :key="n">{{ n }}</span>
      </div>
    </div>
    <DialogDelete
      :dialogDelete="dialogDelete"
      @closeDeleteDialog="dialogDelete = false"
    ></DialogDelete>

    <DialogDetail
      :dialogDetail="dialogDetail"
      @closeDetailDialog="dialogDetail = false"
      :itemType="itemType"
      :listDetailTitle="listDetailTitle"
      :listDetailContent="listDetailContent"
    ></DialogDetail>

    <DialogEditAirline
      :dialogEdit="dialogEdit"
      @closeEditDialog="dialogEdit = false"
      :airline="airline"
    ></DialogEditAirline>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import DialogDelete from "@/components/DialogDelete.vue";

import { LoadingType } from "@/modules/store";
import Airline from "@/models/AirlineModel";
import DialogDetail from "@/components/DialogDetail.vue";
import DialogEditAirline from "@/components/DialogEditAirline.vue";
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
const defaultListDetailContent = [0, "", "", ""];

@Component({
  components: {
    DialogDelete,
    DialogDetail,
    DialogEditAirline,
  },
})
export default class AirlineTable extends Vue {
  @State("isLoading") isLoading!: LoadingType;
  @State("airlineList") listAirlines!: Airline[];
  @Mutation("getListAirline") getAllAirline!: Function;
  @Action("fetchAirlines") fetchAirlines!: any;

  listDetailTitle = ["id", "name", "country", "logo"];
  listDetailContent = defaultListDetailContent;
  dialogDelete = false;
  dialogDetail = false;
  dialogEdit = false;
  itemType = "Airline";
  imgUrl = "";
  valid = true;
  menu = false;
  airline = defaultAriline;
  name = "";
  country = "";
  email = "";

  totalPage = 0;
  size = 50;
  numPage() {}
  getById(id: number) {
    for (let row of this.listAirlines) {
      if (row.id === id) {
        this.airline = row;
      }
    }
  }
  // getAirline(currentPage: number) {
  //   axios.get(urlGet).then((response) => {
  //     let rowData = response.data;
  //     let start = (currentPage - 1) * this.size;
  //     let end = start + this.size;
  //     this.totalPage = Math.ceil(response.data.length / this.size);
  //     console.log("totalpage:", this.totalPage);
  //     this.listAirlines = response.data.slice(start, end);

  //
  //   });
  // }
  created() {
    this.fetchAirlines();
    console.log("list ariline", this.listAirlines);
  }

  onSubmit() {}
  displayDetailDialog(id: number) {
    this.getById(id);
    this.listDetailContent = [
      this.airline.id,
      this.airline.name,
      this.airline.country,
      this.airline.logo,
    ];
    this.dialogDetail = true;
  }
  displayEditDialog(id: number) {
    this.getById(id);
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
