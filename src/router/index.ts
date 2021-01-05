import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloWorld.vue'
import Greet from '../components/Greet.vue'
import Form01 from '../components/Form01.vue'
import AirlineTable from '../components/AirlineTable.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/greet',
      name: 'Greet',
      component: Greet
    },
    {
      path: '/formAirline',
      name: 'FormAirline',
      component: Form01
    }, 
    {
      path: '/airline-table',
      name: 'AirlineTable',
      component: AirlineTable
    }
    
  ]
})