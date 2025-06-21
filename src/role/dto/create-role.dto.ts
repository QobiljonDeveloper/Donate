import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "admin",
    description: "Rolelarni yaratishda admin superadminlar bor",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Bu Biznin loyhani admini",
    description: "Yaratilgan role haqida descriptin yozish mumkin",
  })
  @IsString()
  description: string;
}
