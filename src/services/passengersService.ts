import axios from "axios";

export const baseUrl = "https://api.instantwebtools.net/v1/";

export default {
  getPassengers: async () => {
    return axios.get(`${baseUrl}passenger?page=0&size=10`);
  },
};
