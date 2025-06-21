import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "admin1",
    description: "Admin Ismi ",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @ApiProperty({
    example: "admin@gmail.com",
    description: "Admin Emaili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: "admin!Etc",
    description:
      "Admin mininum 6 ta bo'lishi kerak parol hamda 1 ta symbol bolishi kerak",
  })
  @IsStrongPassword({ minLength: 6, minUppercase: 0, minSymbols: 1 })
  password_hash: string;
  @ApiProperty({
    example: "true or false",
    description:
      "admin active yoki active emasligini belgilash",
  })
  @IsBoolean()
  is_active: boolean;
}
