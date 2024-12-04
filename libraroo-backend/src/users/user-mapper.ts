import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';

export class UserMapper {
  static toUserDto(user: User): UserDto {
    return {
      id: user._id,
      address: user.address,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
