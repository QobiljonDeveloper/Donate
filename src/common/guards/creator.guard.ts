import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || user.role !== "creator") {
      throw new ForbiddenException("Faqat creatorlar uchun ruxsat berilgan");
    }

    return true;
  }
}
