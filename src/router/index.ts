import Vue from 'vue'
import Router from 'vue-router'
import Greet from '../components/Greet.vue'
import FormAirline from '../components/FormAirline.vue'
import AirlineTable from '../components/AirlineTable.vue'
import PassengerTable from '../components/PassengerTable.vue'
import FormPassenger from '../components/FormPassenger.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/greet',
      name: 'Greet',
      component: Greet
    }, 
    {
      path: '/airline-table',
      name: 'AirlineTable',
      component: AirlineTable
    },
    {
      path: '/passenger-table',
      name: 'PassengerTable',
      component: PassengerTable
    },
    {
      path: '/form-passenger',
      name: 'FormPassenger',
      component: FormPassenger
    },
    {
      path: '/form-airline',
      name: 'FormAirline',
      component: FormAirline
    },
  ]
})