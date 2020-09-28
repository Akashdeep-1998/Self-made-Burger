import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-burger-3d2e7.firebaseio.com/",             //Creating an end-point for all the routes..
});

export default axiosInstance;