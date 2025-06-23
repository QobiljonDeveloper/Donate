import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsPositive, IsString, IsUrl } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductImageDto {
  @ApiProperty({ example: 1, description: "Mahsulot ID raqami" })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: "https://example.com/images/product1.jpg",
    description: "Mahsulot rasmi URL manzili",
  })
  @Type(() => String)
  @IsString()
  image_url: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasmmi yoki yo'qmi",
  })
  @Type(() => Boolean)
  @IsBoolean()
  is_main: boolean;
}
