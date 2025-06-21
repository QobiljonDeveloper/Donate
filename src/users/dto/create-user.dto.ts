import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UsersRole } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "Vali Aliyev",
    description: "Ro'yxattan o'tayotkan foydalanuvchining to'liq ism familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @IsEmail()
  @ApiProperty({
    example: "ali@gmail.com",
    description: "Ro'yxatdan o'tayotkan foydalanuvchining ",
  })
  email: string;
  @ApiProperty({
    example: "user",
    description:
      "Ro'yxattan o'tayotkan foydalanuvchining rolesi creator yoki user",
  })
  @IsEnum(UsersRole, {
    message: " Role faqat creator yoki user bo'lishi kerak",
  })
  role: UsersRole;
  @ApiProperty({
    example: "O'zi haqida malumot",
    description: "Ro'yxattan o'tayotkan foydalanuvchining Biosi",
  })
  @IsString()
  bio: string;
  @ApiProperty({
    example: "rasm joylanadi",
    description: "Ro'yxattan o'tayotkan foydalanuvchining rasmi",
  })
  @IsString()
  avatar_url: string;
  @ApiProperty({
    example: "Orqaga fon rasmi joylanadi",
    description:
      "Ro'yxattan o'tayotkan foydalanuvchining orqaga fon rasmi joylanadi",
  })
  @IsString()
  banner_url: string;
}
