import Airline from "@/models/AirlineModel";

export default class PassengerModel {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;

  constructor() {
    this._id = '';
    this.name = '';
    this.trips = 0;
    this.airline = new Airline;
  }
}
