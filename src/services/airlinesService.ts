import axios from "axios";

import {baseUrl} from "./baseUrl"
import Airline from '@/models/AirlineModel'

export default {
  getAirlines: async () => {
    return axios.get(`${baseUrl}airlines`);
  },
  deleteAirline: async (id:number) => {

  },
  postAirline: async (airline:Airline) => {
     axios.post(`${baseUrl}airlines`,airline)
     .then((response) => console.log(response))
     .catch((error) => console.log(error))
  }
};
