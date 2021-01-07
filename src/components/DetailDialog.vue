<template>
    <v-dialog v-model="dialogDetail" hide-overlay width="500">
      <v-card>
        <v-card-title class="dialog-title">{{item}}</v-card-title>
        <v-divider></v-divider>

        <div class="detail-content">
          <!-- <li v-for="(a,index) in airline" :key="index">{{a}} : {{airline[a]}}</li> -->
          <div v-for="n in 3" :key="n" class="detail-item">
            <div class="item-title">ID</div>
            <div class="item-content">{{ passenger._id }}</div>
          </div>
          <v-divider v-for="n in 3" :key="n"></v-divider>
          <div class="detail-item">
            <div class="item-title">Name</div>
            <div class="item-content">{{ passenger.name }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Trips</div>
            <div class="item-content">{{ passenger.trips }}</div>
          </div>
          <v-divider></v-divider>
          <div class="detail-item">
            <div class="item-title">Logo</div>
            <div class="item-content">
              <img class="img-logo" v-if="passenger.airline" :src="passenger.airline.logo"  alt="" />
            </div>
          </div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogDetail = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import DataTable from "./DataTable.vue";

@Component
export default class DetailDialog extends DataTable{
    title = '';
    dialogDetail = false;
    item = {};
    itemTitle = [];
    
}
</script>