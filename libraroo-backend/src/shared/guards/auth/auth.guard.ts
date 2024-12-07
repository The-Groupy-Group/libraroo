import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from '../../jwt/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) throw new UnauthorizedException();

    try {
      const token = authorization.split(' ')[1];
      const tokenPayload: JwtPayLoad = await this.jwtService.verifyAsync(token);
      request.jwtPayLoad = tokenPayload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
