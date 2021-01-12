import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import Airline from "../models/AirlineModel";
import Passenger from '@/models/PassengerModel'

import airlinesService from '@/services/airlinesService'
import passengersService from '@/services/passengersService'

Vue.use(Vuex);


export enum LoadingType {
  IDLE= "idle",
  LOADING = "loading",
  DONE = "done",
  ERROR = "error"
}

export interface State {
  num: number
  airlineList: Airline[]
  isLoading: LoadingType
  passengerList: Passenger[] 
}


export default new Vuex.Store<State>({
  state: {
    num: 0,
    airlineList: Array<Airline>(),
    passengerList : Array<Passenger>(),
    isLoading: LoadingType.IDLE
  },
  getters :{
    allAirline: (state) => state.airlineList
  },
  mutations: {
    getListAirline(state: State, airlineList: Airline[]) {
      state.airlineList = airlineList;
    },
    getListPassenger(state: State, passengerList: Passenger[]){
      state.passengerList = passengerList;
    },
    updateLoading(state: State, loading: LoadingType) {
      state.isLoading = loading
    },
    removePassenger(state: State,id:string) {
      state.passengerList = state.passengerList.filter(passenger => passenger._id !== id)
    },
    newAirlines(state: State,airline: Airline){
      state.airlineList.unshift(airline)
    },
    add(state,payload:number) {
        state.num +=payload   
    }, 
    minus(state,payload:number) {
        state.num -=payload
    }
  },
  actions: {

    async fetchAirlines({ commit }) {
      commit("updateLoading", LoadingType.LOADING)
      const response = await airlinesService.getAirlines()
      commit("updateLoading", LoadingType.DONE)
      commit("getListAirline", response.data);
    },
    async fetchPassenger({commit}) {
      commit("updateLoading", LoadingType.LOADING)
      const response = await passengersService.getPassengers()
      console.log('response', response)
      commit("updateLoading", LoadingType.DONE)
      commit("getListPassenger", response.data.data);
    },
    async deletePassenger({commit},id:string) {
      const response = await passengersService.deletePassenger(id);
      commit('removePassenger',id)
    },
    async addAirline({commit},airline:Airline) {
      const response = await airlinesService.postAirline(airline);
      commit('newAirlines',airline);
    }
  },
});
