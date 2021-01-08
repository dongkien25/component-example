<template>
  <v-app>
    <v-main >
      <div class="main-btn-group">
        <v-btn>
          <router-link class="btn-link" to="/airline-table">Airline Table</router-link>
        </v-btn>
        <v-btn>
          <router-link class="btn-link" to="/passenger-table">Passenger Table</router-link>
        </v-btn>
        <v-btn>
          <router-link class="btn-link" to="/test">Test</router-link>
        </v-btn>
		<v-btn>
          <router-link class="btn-link" to="/example">Example</router-link>
        </v-btn>
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