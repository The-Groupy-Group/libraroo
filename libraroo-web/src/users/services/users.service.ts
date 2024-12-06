import { AxiosInstance } from "axios";
import { CreateUserDto } from "../models/create-user.dto";

class UsersService {

    constructor(private readonly apiClient: AxiosInstance) {}

    async register(request: CreateUserDto) {
        await this.apiClient.post(`users`, request);
    }
}


export default UsersService;