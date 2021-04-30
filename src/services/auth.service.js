import axios from "axios";
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000';

//const API_URL = "/" /* "http://localhost:3100/api/auth/" */;
const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(username, password, rememberMe) {
    //return Promise.resolve("");
    return axios
      .post(API_URL + "auth/login", { username, password })
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

  register(email, username, password, rememberMe) {
    return axios
      .post(API_URL + "auth/signup", {
        username,
        email,
        password,
      })
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
}

export default new AuthService();
