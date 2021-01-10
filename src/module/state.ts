// import axios from "axios";

// export interface Airline {
//     id: number;
//     name: string;
//     country: string;
//     logo: string;
//     slogan: string;
//     head_quaters: string;
//     website: string;
//     established: string;
//   }
//   export interface Passenger {
//     _id: string;
//     name: string;
//     trips: number;
//     airline: Airline;
//   }
//   export interface ResponsePassenger {
//     totalPassengers: number;
//     totalPages: number;
//     data: Passenger[];
//   }  

//   export interface State {
//     num: number
//     airlineList: Airline[];
//     passengerList: Passenger[],
// }
// const baseUrl = 'https://api.instantwebtools.net/v1/';

// const state: State = {
//     num: 0,
//     airlineList: [],
//     passengerList: []
// }


//  const mutations = {
//     add: (state: State,payload:number) => state.num +=payload ,
//     minus: (state: State,payload:number) =>state.num -=payload,
//     getListAirline: (state: State, arilineList: Airline[]) =>(state.airlineList = arilineList)
// }

// const actions = {
//     async fetchAirline({commit}) => {
//       const response = await axios.get(`${baseUrl}airlines`);
//       commit('getListAirline', response.data)
//     }
// }

// export default {
//     state,
//     mutations
// }
