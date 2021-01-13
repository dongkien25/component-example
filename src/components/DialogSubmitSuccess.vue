<template>
    <v-dialog v-model="dgSubmitSuccess" hide-overlay width="500">
    <v-card>
      <v-card-title class="dialog-title">Airline successfully created!</v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="confirm-btn">
        <v-btn color="primary" @click="closeDialog()"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DialogSubmitSuccess extends Vue {
    @Prop() dgSubmitSuccess!: boolean
    closeDialog (){
        this.$emit('close-dg-submit-success');
    }
}
</script>