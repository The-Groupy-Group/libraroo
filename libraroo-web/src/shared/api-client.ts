import axios from "axios";
//import usersService from "../users/services/users.service";
import { StatusCodes } from "http-status-codes";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = "";//usersService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      //usersService.logout();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => {
  if (response.data) {
    convertDates(response.data);
  }
  return response;
});

function convertDates(obj: any) {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "string" && isIsoDateString(value)) {
      obj[key] = new Date(value);
    } else if (typeof value === "object") {
      convertDates(value);
    }
  }
}

function isIsoDateString(value: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return isoDateRegex.test(value);
}

export default axiosInstance;