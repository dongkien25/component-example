<template>
  <v-dialog v-model="dialogDelete" hide-overlay width="300">
    <v-card>
      <v-card-title class="dialog-title">Are you sure?</v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="confirm-btn">
        <v-btn color="error"> Yes </v-btn>
        <v-btn color="primary" @click="closeDeleteDialog()"> No </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class DialogDelete extends Vue {
  @Prop() dialogDelete!: boolean
  closeDeleteDialog(){
    this.$emit('closeDeleteDialog')
  }
}

</script>