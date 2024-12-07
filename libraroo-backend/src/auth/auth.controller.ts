import { LoginDto } from 'src/auth/dto/login.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { ApiRequest } from 'src/shared/models/api-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'login into existing user' })
  @ApiOkResponse({
    description: 'LoginResponse',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiResponse({ status: 400, description: 'bad request.' })
  login(@Body() input: LoginDto) {
    return this.authService.authenticate(input);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request: ApiRequest) {
    return request.jwtPayLoad;
  }
}
