import { User } from './../users/models/user.model';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from '../shared/jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersRepository.findByEmail(input.email);
    if (
      !user ||
      !(await this.validatePassword(input.password, user.passwordHash))
    )
      throw new BadRequestException();
    const accessToken = await this.createToken(user);
    return new LoginResponseDto(accessToken, user._id);
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  private async createToken(user: User): Promise<string> {
    const tokenPayload: JwtPayLoad = {
      sub: user._id,
      email: user.email,
    };
    return await this.jwtService.signAsync(tokenPayload);
  }
}
