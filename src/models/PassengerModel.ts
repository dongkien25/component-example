import Airline from "@/models/AirlineModel";

export default class PassengerModel {
  _id?: string;
  name: string;
  trips: number;
  contentAirline?: Airline;
  airline?: number;

  constructor() {
    this._id = '';
    this.name = '';
    this.trips = 0;
    this.contentAirline = new Airline;
  }
}
