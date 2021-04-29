import axios from "axios";

const options = {
  // baseURL: process.env.BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
  },
};

function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      // let data = response.data;
      // if (response.data.authenticationToken) {
      //   const user = JSON.parse(localStorage.getItem("user"));
      //   user.authenticationToken = response.data.authenticationToken
      // }

      return response;
    },
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 404) {
        return Promise.reject(error);
      }

      /*
       * When response code is 404, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 404 response
       */
      axios.interceptors.response.eject(interceptor);
      const user = JSON.parse(localStorage.getItem("user"));
      //options["method"] = "POST";
      return axios
        .post(
          process.env.REACT_APP_API_URL + "refresh/token",
          {
            username: user.username,
            refreshToken: user.refreshToken,
          },
          options
        )
        .then((response) => {
          user.authenticationToken = response.data.authenticationToken;
          user.refreshToken = response.data.refreshToken;
          localStorage.setItem("user", JSON.stringify(user));
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.token;
          return axios(error.response.config);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(() => {
          createAxiosResponseInterceptor();
        });
    }
  );
}
export default createAxiosResponseInterceptor;
