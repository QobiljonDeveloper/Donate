import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateSavedItemDto {
  @ApiProperty({
    example: 1,
    description: "Saqlayotgan foydalanuvchi ID raqami",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 10,
    description: "Saqlanayotgan mahsulot ID raqami",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
      productId: number;
}
