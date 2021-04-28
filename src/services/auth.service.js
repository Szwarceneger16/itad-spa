import axios from "axios";
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000';

const API_URL = "http://localhost:3100/api/auth/";

class AuthService {
  login(username, password,rememberMe) {
    return axios
      .post(API_URL + "login",
       { username, password })
      .then((response) => {
        //return response.data;
        let data = response.data;
        if (response.data.authenticationToken) {
          data.rememberMe = rememberMe;
          localStorage.setItem("user", JSON.stringify(data));
        }

        return data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, username, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
