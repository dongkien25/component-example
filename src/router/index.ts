import Vue from "vue";
import Router from "vue-router";
import Greet from "@/components/Greet.vue";
import FormAirline from "@/pages/FormAirline.vue";
import AirlineTable from "@/pages/AirlineTable.vue";
import PassengerTable from "@/pages/PassengerTable.vue";
import FormPassenger from "@/pages/FormPassenger.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import Example from "@/components/Example.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/greet",
      name: "Greet",
      component: Greet,
    },
    {
      path: "/airline-table",
      name: "AirlineTable",
      component: AirlineTable,
    },
    {
      path: "/passenger-table",
      name: "PassengerTable",
      component: PassengerTable,
    },
    {
      path: "/form-passenger",
      name: "FormPassenger",
      component: FormPassenger,
    },
    {
      path: "/form-airline",
      name: "FormAirline",
      component: FormAirline,
    },
    {
      path: "/validate-form",
      name: "ValidateForm",
      component: ValidateForm,
    },
    {
      path: "/example",
      name: "Example",
      component: Example,
    },
  ],
});
