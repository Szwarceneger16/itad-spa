import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./config";
//const API_URL = "http://localhost:3100/api/";
// import {API_URL} from './axiosInstance'
//const API_URL = process.env.REACT_APP_API_URL;
const defaultHeaders = {
  "Content-Type": "application/json",
};

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
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
