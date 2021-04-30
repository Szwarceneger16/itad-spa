import axios from "axios";
import authHeader from "./auth-header";

const defaultHeaders = {
  "Content-Type": "application/json",
};
//const API_URL = "http://localhost:3100/api/";
// import {API_URL} from './axiosInstance'
const API_URL = process.env.REACT_APP_API_URL;

class EventService {
  getAllEvents() {
    return axios.get(API_URL + "event/all");
  }

  addEvent(data) {
    const exampleData = {
      name: "Przykladowa nazwa",
      description: "Przykladowy Opis",
      startDate: "2021-03-29T14:30:59.692612Z",
      endDate: "2021-03-29T14:30:59.692612Z",
      availableTickets: 100,
      bookedTickets: 1,
      ticketPrice: 6,
      owner: "0",
      partners: [],
      lectures: [],
    };

    return axios.post(
      API_URL + "event",
      { ...exampleData, ...data },
      { headers: { defaultHeaders, ...authHeader() } }
    );
  }
}

export default new EventService();
