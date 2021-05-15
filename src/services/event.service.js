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

  getEventByName(eventName) {
    if (!eventName || typeof eventName !== "string") throw "wrong input args";
    return axios.get(API_URL + "event/findByName?name=" + eventName);
  }

  getEventCurrentUser() {
    return axios.get(API_URL + "event/currentUser");
  }

  getRegisteredUsers(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(API_URL + "event/getRegisteredUsers?eventId=" + eventId);
  }

  addEvent(name, description, startDate) {
    return axios.post(
      API_URL + "event",
      { name, description, startDate },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  registerOnEvent(eventId) {
    return axios.post(
      API_URL + "event/registerOnEvent",
      { eventId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  modifyEvent(
    eventId,
    name,
    description,
    startDate,
    availableTickets,
    ticketPrice
  ) {
    return axios.put(
      API_URL + "event",
      { name, description, startDate, eventId, availableTickets, ticketPrice },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  deleteEvent(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.delete(API_URL + "event?id=" + eventId);
  }
}

export default new EventService();
