import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class QuestionService {
  getQuestionsFromLecture(lectureId) {
    return axios.get(API_URL + "question?lectureId=" + lectureId, {
      headers: { defaultHeaders, ...authHeader() },
    });
  }

  addQuestion(lectureId, question) {
    return axios.post(
      API_URL + "question",
      { lectureId, question },
      {
        headers: { defaultHeaders, ...authHeader() },
      }
    );
  }
}

export default new QuestionService();
