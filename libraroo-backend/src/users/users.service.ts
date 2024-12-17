import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserMapper } from './user-mapper';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UsersRepository) {}

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

    this.logger.log(`created user with id: ${savedUser._id}`);
    
    return UserMapper.toUserDto(savedUser);
  }
}
