import { isAxiosError } from "axios";

export class Utils {


  static async getErrorMessage(err: Error) {
    let message = "";

    if (isAxiosError(err)) {
      if (err.response) {
        // Server responded with an error
        message = `Error : ${
          err.response.data.message || "Something went wrong"
        }`;
      } else if (err.request) {
        // Request was made but no response received
        message = "Network error: No response from server.";
      } else {
        // An error occurred while setting up the request
        message = "An unexpected error occurred. Please try again.";
      }
    } else {
      // Handle non-Axios errors
      message = "Unexpected error occurred.";
    }

    return message;
  }
}

