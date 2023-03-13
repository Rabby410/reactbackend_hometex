import axios from "axios";
import { redirect } from "react-router-dom";
import GlobalFunction from './assets/GlobalFunction'


axios.interceptors.request.use(function (config) {
    if(localStorage.token != undefined){
         axios.headers['Authorization'] = `Bearer ${localStorage.token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if(error.response.status == 401){

      GlobalFunction.logOut()
    }
    else if(error.response.status == 500){
      window.location.href = window.location.origin+'error-500'
    }
    return Promise.reject(error);
  });