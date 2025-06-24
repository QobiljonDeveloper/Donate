import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SigninUserDto {
  @IsEmail()
  @ApiProperty({
    example: "ali@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "myStrongPassword",
    description: "Foydalanuvchi paroli",
  })
  password_hash: string;
}
