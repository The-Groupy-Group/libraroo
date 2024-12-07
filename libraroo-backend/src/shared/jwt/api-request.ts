import { JwtPayLoad } from "./jwt-payload";

export class ApiRequest extends Request {
    jwtPayLoad?: JwtPayLoad;
}