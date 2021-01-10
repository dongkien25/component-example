import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import Airline from "../model/AirlineModel";

Vue.use(Vuex);

const baseUrl = "https://api.instantwebtools.net/v1/";
export default new Vuex.Store({
  state: {
    num: 0,
    airlineList: Array<Airline>(),
  },
  mutations: {
    getListAirline(state, arilineList: Airline[]) {
      state.airlineList = arilineList;
    },
    add(state,payload:number) {
        state.num +=payload   
    }, 
    minus(state,payload:number) {
        state.num -=payload
    }
  },
  actions: {
    async fetchAirlines({ commit }, currentPage: number) {
      const response = await axios.get(`${baseUrl}airlines`);
      commit("getListAirline", response.data);
    },
  },
});
