<template>
  <v-dialog v-model="dialogDetail" hide-overlay width="500">
    <v-card>
      <v-card-title class="dialog-title">{{ itemType }}</v-card-title>
      <v-divider></v-divider>
      <div class="wrap-detail">
        <div v-for="n in 4" :key="n" class="detail-content">
          <div class="detail-item">
            <div class="item-title">{{ listDetailTitle[n-1] }}</div>
            <div v-if="n == 4" class="item-content">
              <img
                class="img-logo"
                :src="listDetailContent[n-1]"
                alt=""
              />
            </div>
            <div v-else class="item-content">
              {{ listDetailContent[n-1] }}
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
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class DialogDetail extends Vue {
  @Prop() dialogDetail!: boolean;
  @Prop() itemType!: string;
  @Prop() listDetailTitle!: Array<string | number>;
  @Prop() listDetailContent!: Array<string | number | undefined>;
   
  closeDetailDialog(){
    this.$emit('closeDetailDialog')
  }
}
</script>
<style scoped>
.item-title{
  text-transform: capitalize;
}
</style>