import axios from "axios";
import authHeader from "./auth-header";

const defaultHeaders = {
  "Content-Type": "application/json",
};
//const API_URL = "http://localhost:3100/api/";
// import {API_URL} from './axiosInstance'
const API_URL = process.env.REACT_APP_API_URL;

class EventService {
  getEventsAll() {
    return axios.get(API_URL + "event/all");
  }

  getEventByID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(API_URL + "event/findById?id=" + eventId);
  }

  addEvent(data) {
    return axios.post(API_URL + "event", data, {
      headers: { defaultHeaders, ...authHeader() },
    });
  }
}

export default new EventService();
