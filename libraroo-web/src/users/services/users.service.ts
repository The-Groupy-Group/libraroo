import { AxiosInstance, AxiosResponse } from "axios";
import { CreateUserDto } from "../models/create-user.dto";
import apiClient from "../../shared/api-client";

class UsersService {
  constructor(private readonly apiClient: AxiosInstance) {}

  async register(request: CreateUserDto) {
    await this.apiClient.post(`users`, request);
  }

  async login(email: string, password: string) {
    const response: AxiosResponse<{ accessToken: string }> =
      await this.apiClient.post(`users/login`, { email, password });
    const token = response.data.accessToken;
    sessionStorage.setItem("token", token);
  }
}

export default new UsersService(apiClient);
