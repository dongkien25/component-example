<template>
    <input type="text" name="" id="" :value="number">
    
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {State} from 'vuex-class'
@Component
export default class Result extends Vue {
    // @Prop() readonly number!: number;
    @State('num') number!:number
}
</script>
<style scoped>
input{
    border: 1px solid #888;
}
</style>