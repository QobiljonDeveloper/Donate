import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({ message: "Authorization header yo'q" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Token noto‘g‘ri formatda" });
    }

    try {
      const decoded = this.jwtService.decode(token) as any;
      const role = decoded?.role?.toUpperCase();
      const secret = process.env[`SECRET_KEY_${role}`];
      const verified = this.jwtService.verify(token, { secret });

      req.user = verified;
      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: "Token yaroqsiz" });
    }
  }
}
