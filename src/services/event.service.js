import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class EventService {
  getEventsAll() {
    return axios.get(API_URL + "event/all");
  }

  getEventByID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(API_URL + "event/findById?id=" + eventId);
  }

  addEvent(name, description, startTime) {
    return axios.post(
      API_URL + "event",
      { name, description, startTime },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }
}

export default new EventService();
