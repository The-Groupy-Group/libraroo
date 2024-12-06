import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  ownedBooksList: Types.ObjectId[];
}
