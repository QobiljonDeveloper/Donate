import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductImageDto {
  @ApiProperty({ example: 1, description: "Mahsulot ID raqami" })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: "https://example.com/images/product1.jpg",
    description: "Mahsulot rasmi URL manzili",
  })
  @IsString()
  @IsUrl()
  image_url: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasmmi yoki yo'qmi",
  })
  @IsBoolean()
  is_main: boolean;
}
