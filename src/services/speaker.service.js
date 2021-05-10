import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class SpeakerService {
  getSpeakersByEventID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(
      API_URL + "speaker/getSpeakersFormEvent?eventId=" + eventId
    );
  }

  getSpeakerBySpeakerID(speakerId) {
    if (!speakerId || typeof speakerId !== "number") throw "wrong input args";
    return axios.get(
      API_URL + "speaker/getSpeakersFormEvent?eventId=" + speakerId
    );
  }

  addSpeaker(eventId, name, surname, description) {
    return axios.post(
      API_URL + "speaker",
      { name, surname, description, eventId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  modifySpeaker(speakerId, name, surname, description) {
    return axios.put(
      API_URL + "speaker",
      { name, surname, description, speakerId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  deleteSpeaker(speakerId, eventId) {
    if (!speakerId || typeof speakerId !== "number") throw "wrong input args";
    return axios.delete(
      API_URL + "speaker?speakerId=" + speakerId + "&eventId=" + eventId
    );
  }
}

export default new SpeakerService();
