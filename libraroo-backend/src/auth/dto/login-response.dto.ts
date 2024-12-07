import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  id: string;

  constructor(accessToken: string, id: string) {
    this.accessToken = accessToken;
    this.id = id;
  }
}
