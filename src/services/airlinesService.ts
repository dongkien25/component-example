import axios from "axios";

import { baseUrl } from "./baseUrl";
import Airline from "@/models/AirlineModel";
const statusResponse = (status: number) => {
  return status;
};
const errorMsgResponse = (msg: string) => {
  return msg;
};
export default {
  getAirlines: async () => {
    return axios.get(`${baseUrl}airlines`);
  },
  deleteAirline: async (id: number) => {},
  postAirline: async (airline: Airline) => {
    axios
      .post(`${baseUrl}airlines`, airline)
      .then((response) => {
        statusResponse(response.status);
        console.log(response);
      })
      .catch((error) => {
        errorMsgResponse(error.message);
        console.log(error);
      });
  },
  statusResponse,
  errorMsgResponse,
};
