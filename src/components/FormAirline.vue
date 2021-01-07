<template>
  <div class="form-airline">
    <form class="form" id="form-airline" @submit.prevent="onSubmit" action="">
      <h2 class="heading">Form for Airline</h2>
      <div class="form-group">
        <label class="form-label" for="">Name :</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Country :</label>
        <input
          id="country"
          v-model="country"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Logo :</label>
        <input
          id="logo"
          v-model="logo"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Slogan :</label>
        <input
          id="slogan"
          v-model="slogan"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Head Quaters :</label>
        <input
          id="head_quaters"
          v-model="head_quaters"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Website :</label>
        <input
          id="website"
          v-model="website"
          type="text"
          placeholder=""
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="">Established :</label>
        <!-- <input
          id="established"
          v-model="established"
          type="text"
          placeholder=""
          class="form-control"
        /> -->
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
               
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
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
      </div>
      <button class="form-submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class FormAirline extends Vue {
  date = new Date().toISOString().substr(0, 10);
  menu = false;
}
</script>

<style>
.form {
  width: 460px;
  min-height: 100px;
  padding: 32px 24px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  margin: 24px;
  align-self: center;
  box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
}
.form-group {
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
}
.form-label {
  text-align: left;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
  text-decoration: none;
}
.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
}
.form-submit:hover {
  background-color: #1ac7b6;
}
#established {
  padding: 0;
}
</style>