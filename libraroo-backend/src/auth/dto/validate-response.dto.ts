import { ApiProperty } from '@nestjs/swagger';

export class ValidateResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  constructor(email: string, id: string) {
    this.email = email;
    this.id = id;
  }
}
