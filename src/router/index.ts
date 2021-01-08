import Vue from 'vue'
import Router from 'vue-router'
import Greet from '../components/Greet.vue'
import FormAirline from '../components/FormAirline.vue'
import AirlineTable from '../components/AirlineTable.vue'
import PassengerTable from '../components/PassengerTable.vue'
import FormPassenger from '../components/FormPassenger.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Test from '../components/Test.vue'
import Example from '../components/Example.vue'
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
    {
      path: '/validate-form',
      name: 'ValidateForm',
      component: ValidateForm
    },
    {
      path: '/test',
      name: 'Tets',
      component: Test
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
    }

    
  ]
})