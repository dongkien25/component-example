import Passenger from "@/model/PassengerModel";

export default class ResponsePassenger {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];

  constructor() {
    this.totalPassengers = 0;
    this.totalPages = 0;
    this.data = new Array<Passenger>();
  }
}
