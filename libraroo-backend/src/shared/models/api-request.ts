import { JwtPayLoad } from '../jwt/jwt-payload';

export class ApiRequest extends Request {
  jwtPayLoad?: JwtPayLoad;
}
