import { AxiosInstance } from "axios";
import { CreateUserDto } from "../models/create-user.dto";
import apiClient from "../../shared/api-client";

class UsersService {

    constructor(private readonly apiClient: AxiosInstance) {}

    async register(request: CreateUserDto) {
        await this.apiClient.post(`users`, request);
    }

    
}


export default new UsersService(apiClient);