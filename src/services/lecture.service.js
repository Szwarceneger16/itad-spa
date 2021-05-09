import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class LectureService {
  getLecturesByEventID(eventId) {
    if (!eventId || typeof eventId !== "number") throw "wrong input args";
    return axios.get(
      API_URL + "lecture/getLectureFromEvent?eventId=" + eventId
    );
  }

  getLectureByLectureID(lectureId) {
    if (!lectureId || typeof lectureId !== "number") throw "wrong input args";
    return axios.get(
      API_URL + "lecture/getLectureFromEvent?lectureId=" + lectureId
    );
  }

  addLecture(name, description, startDate, eventId) {
    return axios.post(
      API_URL + "lecture",
      { name, description, startDate, eventId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }
}

export default new LectureService();