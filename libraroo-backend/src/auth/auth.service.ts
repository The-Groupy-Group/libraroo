import { UsersRepository } from '../users/users.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { compare } from 'bcrypt';
import { ValidateResponseDto } from './dto/validate-response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from '../shared/jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(input);
    if (!user) throw new BadRequestException();
    return this.signIn(user);
  }

  async validateUser(input: LoginDto): Promise<ValidateResponseDto | null> {
    const user = await this.usersRepository.findByEmail(input.email);
    if (user && (await compare(input.password, user.passwordHash)))
      return new ValidateResponseDto(user.email, user.id);
    return null;
  }

  async signIn(user: ValidateResponseDto): Promise<LoginResponseDto> {
    const tokenPayload: JwtPayLoad = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return new LoginResponseDto(accessToken, user.id);
  }
}
