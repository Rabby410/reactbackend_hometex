import axios from "axios";


axios.interceptors.request.use(function (config) {
    if(localStorage.token != undefined){
         // config.headers['Authorization'] = `Bearer ${localStorage.token}`
         axios.headers['Authorization'] = `Bearer ${localStorage.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(error)
    return Promise.reject(error);
  });