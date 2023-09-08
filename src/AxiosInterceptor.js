import axios from "axios";
import GlobalFunction from "./assets/GlobalFunction";

axios.interceptors.request.use(
  function (config) {
    if (localStorage.token && isValidToken(localStorage.token)) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status == 401) {
      GlobalFunction.logOut();
    } else if (error.response.status == 500) {
      window.location.href = window.location.origin + "error-500";
    }
    return Promise.reject(error);
  }
);
