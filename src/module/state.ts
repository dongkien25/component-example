
export interface Airline {
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
  }
  export interface Passenger {
    _id: string;
    name: string;
    trips: number;
    airline: Airline;
  }
  export interface ResponsePassenger {
    totalPassengers: number;
    totalPages: number;
    data: Passenger[];
  }  

const baseUrl = 'https://api.instantwebtools.net/v1/';

const state: State = {
    num: 0,
}

export interface State {
    num: number
}
 const mutations = {
    add: (state: State,payload:number) => state.num +=payload ,
    minus: (state: State,payload:number) =>state.num -=payload
}

const actions = {
    
}

export default {
    state,
    mutations
}
