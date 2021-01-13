import axios from "axios";

import { baseUrl } from "./baseUrl";
import Passenger from "@/models/PassengerModel";

const statusResponse = (status: number) => {
  return status;
};
const errorMsgResponse = (msg: string) => {
  return msg;
};
export default {
  getPassengers: async () => {
    return axios.get(`${baseUrl}passenger?page=0&size=10`);
  },
  deletePassenger: async (id: string) => {
    axios
      .delete(`${baseUrl}passenger/${id}`)
      .then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Delete success");
        }
      })
      .catch((error: string) => {
        console.log(error);
      });
  },
  postPassenger: async (passenger: Passenger) => {
    axios
      .post(`${baseUrl}passenger`, passenger)
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
