import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";

@ApiTags('api/users')
@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'create new user' })
    @ApiCreatedResponse({
        description: 'UserDTO',
        type: UserDto
    })
    @ApiBadRequestResponse()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
}