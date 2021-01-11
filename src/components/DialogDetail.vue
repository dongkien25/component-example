<template>
  <v-dialog v-model="dialogDetail" hide-overlay width="500">
    <v-card>
      <v-card-title class="dialog-title">{{ itemType }}</v-card-title>
      <v-divider></v-divider>
      <div class="wrap-detail">
        <div v-for="(item,index) in itemList" :key="index" class="detail-content">
          <div class="detail-item">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-content">
              {{ item.content }}
              <!-- <img
                class="img-logo"
                
                alt=""
              /> -->
            </div>
          </div>
          <v-divider></v-divider>
          <!-- <div class="detail-item">
          <div class="item-title">Logo</div>
          <div class="item-content">
            <img
              class="img-logo"
              v-if="passenger.airline"
              :src="passenger.airline.logo"
              alt=""
            />
          </div>
        </div> -->
        </div>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="closeDetailDialog()"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export interface ItemDetail {
  title: string;
  content: string ;
}
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class DialogDetail extends Vue {
  @Prop() dialogDetail = false
  @Prop() itemType = '';
  @Prop() itemList!: ItemDetail[];
   
  closeDetailDialog(){
    this.$emit('closeDetailDialog')
  }
}
</script>