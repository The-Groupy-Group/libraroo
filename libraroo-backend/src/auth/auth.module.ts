import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}
