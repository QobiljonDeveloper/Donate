import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Matches,
} from "class-validator";
import {
  DeliveryStatus,
  PaymentOrderStatus,
} from "../models/product-order.model";

export class CreatePaymentOrderDto {
  @ApiProperty({
    example: 1,
    description: "Buyurtmachi (foydalanuvchi) ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  buyerId: number;

  @ApiProperty({
    example: 10,
    description: "Mahsulot ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: 2,
    description: "Buyurtma qilingan mahsulot soni",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantitiy: number;

  @ApiProperty({
    example: 500000,
    description: "Umumiy narx (so‘mda)",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total_price: number;

  @ApiProperty({
    enum: PaymentOrderStatus,
    description: "To‘lov holati (masalan: pending, paid, failed)",
  })
  @IsEnum(PaymentOrderStatus, {
    message: "Noto‘g‘ri status (pending | paid | failed)",
  })
  status: PaymentOrderStatus;

  @ApiProperty({
    example: "Toshkent shahri, Chilonzor tumani, 12-kvartal, 45-uy",
    description: "Yetkazib berish manzili",
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  delivery_address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Mijozning telefon raqami",
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqam formati noto‘g‘ri (masalan, +998901234567)",
  })
  phone_number: string;

  @ApiProperty({
    example: 3,
    description: "Yetkazib beruvchi (kuryer) ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  kuryerId: number;

  @ApiProperty({
    enum: DeliveryStatus,
    description:
      "Yetkazib berish holati (masalan: waiting, on_the_way, delivered)",
  })
  @IsEnum(DeliveryStatus, {
    message: "Noto‘g‘ri delivery_status (waiting | on_the_way | delivered)",
  })
  delivery_status: DeliveryStatus;
}
