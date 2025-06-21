import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: 1,
    description: "Mahsulot yaratuvchisining ID raqami",
  })
  @IsInt()
  @IsPositive()
  creatorId: number;

  @ApiProperty({ example: "Premium Hoodie", description: "Mahsulot nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Yuqori sifatli paxtali kapyushon",
    description: "Mahsulot haqida ma'lumot",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 50, description: "Qolgan mahsulotlar soni (stock)" })
  @IsInt()
  @Min(0)
  in_stock: number;

  @ApiProperty({ example: true, description: "Mahsulot mavjudmi yoki yo'qmi" })
  @IsBoolean()
  is_avialable: boolean;

  @ApiProperty({
    example: 99.99,
    description: "Mahsulot narxi (so'mda yoki valyutada)",
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 2, description: "Mahsulot kategoriyasi ID raqami" })
  @IsInt()
  @IsPositive()
  categoryId: number;
}
