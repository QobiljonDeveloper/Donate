import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post("signin")
  signin(@Body() dto: SigninUserDto) {
    return this.authService.signin(dto);
  }
}
