<template>
  <v-btn @click="add">+</v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class ButtonAdd extends Vue {
  @Mutation("add") mutationAdd: any;
  add() {
    this.mutationAdd(5);
  }
}
</script>