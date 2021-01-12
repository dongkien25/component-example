<template>
  <v-dialog v-model="dialogConFirmEdit" hide-overlay width="500">
    <v-card>
      <v-card-title>Confirm Edit</v-card-title>
      <v-card-text>Do you want to update this passenger?</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error"> Yes </v-btn>
        <v-btn color="primary" @click="closeConfirmDialog"> No </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DialogCofirmEdit extends Vue {
  @Prop() dialogConFirmEdit!: boolean ;
  closeConfirmDialog() {
    this.$emit("closeConfirmDialog");
  }
}
</script>