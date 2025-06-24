import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header yo‘q");
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Token noto‘g‘ri formatda");
    }

    const decoded: any = this.jwtService.decode(token);
    const role = decoded?.role?.toUpperCase();

    if (!role) {
      throw new UnauthorizedException("Token ichida role mavjud emas");
    }

    const secret = process.env[`SECRET_KEY_${role}`];
    if (!secret) {
      throw new UnauthorizedException(`Secret topilmadi: SECRET_KEY_${role}`);
    }

    let verified: any;
    try {
      verified = this.jwtService.verify(token, { secret });
    } catch (err) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    req.user = verified;

    const paramId = Number(req.params.id);
    if (verified.sub !== paramId) {
      throw new ForbiddenException("Faqat o‘z profilingizga ruxsat beriladi");
    }

    if (verified.role !== "user" && verified.role !== "creator") {
      throw new ForbiddenException("Faqat user yoki creator kirishi mumkin");
    }

    return true;
  }
}
