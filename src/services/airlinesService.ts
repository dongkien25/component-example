import axios from "axios";

export const baseUrl = "https://api.instantwebtools.net/v1/";

export default {
  getAirlines: async () => {
    return axios.get(`${baseUrl}airlines`);
  },
};
