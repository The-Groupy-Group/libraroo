import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserMapper } from './user-mapper';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.findByEmail(createUserDto.email)) {
      throw new BadRequestException(
        'this email is being used by a different user',
      );
    }
    const passwordHash = await hash(createUserDto.password, 10);

    const newUser = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      passwordHash: passwordHash,
      address: createUserDto.address,
    };

    const savedUser = await this.userRepository.create(newUser);
    return UserMapper.toUserDto(savedUser);
  }
}
