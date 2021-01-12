<template>
  <v-app>
    <v-main>
      <div class="main-btn-group">
        <router-link class="btn-link" to="/airline-table">
          <v-btn color="primary"> Airline Table </v-btn>
        </router-link>

        <router-link class="btn-link" to="/passenger-table">
          <v-btn color="primary">Passenger Table</v-btn>
        </router-link>

        <router-link class="btn-link" to="/example">
          <v-btn color="primary">Example</v-btn>
        </router-link>
      </div>

      <!-- <router-link to="/validate-form">Validate Form</router-link> -->

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.btn-link {
  text-decoration: none;
}
.main-btn-group {
  display: flex;
  width: 50%;
  margin: 50px;
  justify-content: space-between;
}
</style>