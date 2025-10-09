import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env === "development"? "http://localhost:3000" : "/api",
  withCredentials: true,
});