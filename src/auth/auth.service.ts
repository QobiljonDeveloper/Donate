import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/sign-in.dto";
import { ConfigService } from "@nestjs/config";
import { UsersRole } from "../users/models/user.model";


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signup(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Bu email allaqachon ro‘yxatdan o‘tgan");
    }

    const hashedPassword = await bcrypt.hash(dto.password_hash, 7);
    const user = await this.usersService.create({
      ...dto,
      password_hash: hashedPassword,
    });

    return this.generateToken(user.id, user.email, user.role);
  }

  async signin(dto: SigninUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("Email yoki parol xato");
    const isMatch = await bcrypt.compare(dto.password_hash, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol xato");
    }
    return this.generateToken(user.id, user.email, user.role);
  }

  private async generateToken(id: number, email: string, role: UsersRole) {
    const secret = this.configService.get<string>(
      `SECRET_KEY_${role.toUpperCase()}`
    );
    const expiresIn = this.configService.get<string>(
      `SECRET_TIME_${role.toUpperCase()}`
    );

    const payload = { sub: id, email, role };
    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });

    return {
      access_token: token,
    };
  }
}
