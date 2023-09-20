import axios from "axios";
import GlobalFunction from "./assets/GlobalFunction";

// Axios request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.token;

    if (token && isValidToken(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        GlobalFunction.logOut();
      } else if (status === 500) {
        window.location.href = window.location.origin + "/error-500"; // Fixed missing slash
      }
    }

    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axios;
