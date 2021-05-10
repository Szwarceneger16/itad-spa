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

  addLecture(eventId, name, description, startDate) {
    return axios.post(
      API_URL + "lecture",
      { name, description, startDate, eventId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  modifyLecture(lectureId, eventId, name, description, startDate) {
    return axios.put(
      API_URL + "lecture",
      { name, description, startDate, lectureId },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }

  deleteLecture(lectureId, eventId) {
    if (!lectureId || typeof lectureId !== "number") throw "wrong input args";
    return axios.delete(
      API_URL + "lecture?lectureId=" + lectureId + "&eventId=" + eventId
    );
  }
}

export default new LectureService();
