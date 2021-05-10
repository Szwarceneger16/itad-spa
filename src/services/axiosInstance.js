import axios from "axios";
//import authHeader from "./auth-header";

const options = {
  baseURL: process.env.REACT_APP_API_URL + "auth/refresh/token",
  headers: {
    "Content-Type": "application/json",
  },
};

function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const token = user.access_token;
        response.headers.Authorization = token ? `Bearer ${token}` : "";
      }
      return response;
    },
    (error) => {
      //console.error("AXIOS = catch repsosne error");
      // Reject promise if usual error
      if (
        error &&
        typeof error.response !== undefined &&
        error.response.status === 401
      ) {
        return Promise.reject(error);
      }

      /*
       * When response code is 404, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 404 response
       */
      if (!localStorage.getItem("user")) {
        console.log("not user");
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);

      const { username, refreshToken, authenticationToken } = JSON.parse(
        localStorage.getItem("user")
      );
      //const header = authHeader();
      options["method"] = "POST";
      options["headers"] = { ...options["headers"], authenticationToken };

      options["data"] = {
        username,
        refreshToken,
      };
      //console.error("AXIOS = request refresh token");
      return axios(options)
        .then((response) => {
          /* console.error(
            "AXIOS = response refresh token",
            response.data.authenticationToken
          ); */
          let user = JSON.parse(localStorage.getItem("user"));
          user.access_token = response.data.token;
          localStorage.setItem("user", JSON.stringify(user));
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.authenticationToken;
          return axios(error.response.config);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}
export default createAxiosResponseInterceptor;
