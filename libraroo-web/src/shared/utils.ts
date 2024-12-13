import { AxiosInstance, isAxiosError } from "axios";
import apiClient from "./api-client";

export class Utils {


  constructor(private readonly apiClient: AxiosInstance) {}

  static async getErrorMessage(err: any) {
    var message;

    if (isAxiosError(err)) {
      if (err.response) {
        // Server responded with an error
        console.log(
          "Server responded:",
          err.response.status,
          err.response.data
        );
        message = `Error : ${
          err.response.data.message || "Something went wrong"
        }`;
      } else if (err.request) {
        // Request was made but no response received
        console.log("No response received:", err.request);
        message = "Network error: No response from server.";
      } else {
        // An error occurred while setting up the request
        console.log("Error during request setup:", err.message);
        message = "An unexpected error occurred. Please try again.";
      }
    } else {
      // Handle non-Axios errors
      console.log("Unexpected error:", err);
      message = "Unexpected error occurred.";
    }

    return message;
    
  }
}

