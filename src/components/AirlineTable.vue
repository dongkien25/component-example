<template>
  <div class="airline-table">
    <h1>This is airline table</h1>
    <table id="airlineTable">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Country</th>
          <th>Logo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
            <td>{{row.id}}</td>
            <td>{{row.name}}</td>
            <td>{{row.country}}</td>
            <td>{{row.logo}}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Vue, Component, Prop} from 'vue-property-decorator'
const urlGet = "https://api.instantwebtools.net/v1/airlines"
const axios = require('axios');
@Component
export default class AirlineTable extends Vue {
    rows = [];
    cols = [];
    mounted() {
        axios
        .get(urlGet)
        .then(response => {
            this.rows = response.data
            this.cols = Object.keys(this.rows[0]);
            
            });
        
    }

    
}
</script>

<style>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>
