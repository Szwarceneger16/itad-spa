import axios from "axios";
//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000';

const API_URL = "http://localhost:3100/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login",
       { username, password },
      //  { withCredentials: false,
      //   headers: {
      //    "Access-Control-Allow-Origin": 'http://localhost:3000',
         
      //  } 
      // }
       )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
