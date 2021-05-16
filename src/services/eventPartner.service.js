import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class EventPartnerService {
  getEventPartnersByEventID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(API_URL + "eventPartner/findInEvent?eventId=" + eventId);
  }

  getEventPartnerByEventPartnerID(eventPartnerId) {
    if (!eventPartnerId || typeof eventPartnerId !== "number")
      throw "wrong input args";
    return axios.get(
      API_URL + "eventPartner/findById?partnerId=" + eventPartnerId
    );
  }

  addEventPartner(eventId, name, description) {
    return axios.post(
      API_URL + "eventPartner",
      { name, description, eventId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  modifyEventPartner(eventPartnerId, name, description) {
    return axios.put(
      API_URL + "eventPartner",
      { name, description, eventPartnerId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  deleteEventPartner(eventPartnerId) {
    if (!eventPartnerId || typeof eventPartnerId !== "number")
      throw "wrong input args";
    return axios.delete(API_URL + "eventPartner?partnerId=" + eventPartnerId);
  }
}

export default new EventPartnerService();
