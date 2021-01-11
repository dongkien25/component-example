<template>
  <div class="parent">
    <ButtonAdd></ButtonAdd>
    <Result :number="number"></Result>
    <ButtonMinus></ButtonMinus>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ButtonAdd from "../components/ButtonAdd.vue";
import ButtonMinus from "../components/ButtonMinus.vue";
import Result from "@/components/Result.vue";
import { mapMutations } from "vuex";
@Component({
  components: {
    ButtonAdd,
    ButtonMinus,
    Result,
  },
})
export default class Example extends Vue {
  number = "";

  // add(name: string) {
  //   this.number = name;
  // }
  // minus(name: string) {
  //   // this.number--;
  //   this.number = name;
  // }
}
</script>
<style scoped>
input {
  border: 1px solid #888;
}
</style>