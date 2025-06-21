import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Hoodie",
    description: "Bu yerga Category nomi yoziladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
