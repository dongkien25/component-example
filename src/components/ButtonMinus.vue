<template>
  <v-btn @click="minus">-</v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class ButtonMinus extends Vue {
  // minus(){
  //     this.$emit('minus','kien')
  // }
  @Mutation("minus") mutationMinus: any;
  minus() {
    this.mutationMinus(5);
  }
}
</script>