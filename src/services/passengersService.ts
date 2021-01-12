import axios from "axios";

import { baseUrl } from "./baseUrl";

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
};
