import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";
const defaultHeaders = {
  "Content-Type": "application/json",
};

class UserService {
  getUserUUID() {
    return axios.get(API_URL + "user/getUUID", {
      headers: { defaultHeaders, ...authHeader() },
    });
  }

  getAllUserTickets() {
    return axios.get(API_URL + "user/tickets", {
      headers: { defaultHeaders, ...authHeader() },
    });
  }

  verificateTicket(uuid) {
    return axios.get(API_URL + "api/ticket/ticketVerification/" + uuid, {
      headers: { defaultHeaders, ...authHeader() },
    });
  }

  getLecturesByEventID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(
      API_URL + "lecture/getLectureFromEvent?eventId=" + eventId
    );
  }

  modifyUser(email, name, surname) {
    return axios.put(
      API_URL + "user",
      { email, name, surname },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
      ).then(response => { 
        console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      }
    );
  }
}

export default new UserService();
