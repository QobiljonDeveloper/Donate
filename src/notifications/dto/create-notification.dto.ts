import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: "3",
    description:
      "Qaysi foydalanuvchiga notification yubormoqchi bo'lsa shunin id si",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    example: "Sizga yangi bildirish noma bor",
    description: "Xabar matni yoziladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
