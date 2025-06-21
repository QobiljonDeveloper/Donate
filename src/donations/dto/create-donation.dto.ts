import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { paymentMethod } from "../models/donation.model";

export class CreateDonationDto {
  @ApiProperty({
    example: 1,
    description: "Donatsiya yuborgan supporter foydalanuvchining IDsi",
  })
  @IsInt()
  @IsNotEmpty()
  supporterId: number;

  @ApiProperty({
    example: 2,
    description:
      "Donatsiya olgan kontent yaratuvchi (creator) foydalanuvchining IDsi",
  })
  @IsInt()
  @IsNotEmpty()
  creatorId: number;

  @ApiProperty({
    example: 10000,
    description: "Donatsiya summasi (so'mda)",
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: "Ishingizga omad!",
    description: "Donatsiyaga yozilgan ixtiyoriy xabar",
    required: false,
  })
  @IsOptional()
  @IsString()
  message: string;

  @ApiProperty({
    enum: paymentMethod,
    example: paymentMethod.PAYME,
    description: "To‘lov usuli",
  })
  @IsEnum(paymentMethod, { message: "payment_method noto‘g‘ri qiymat" })
  payment_method: paymentMethod;

  @ApiProperty({
    example: false,
    description: "Donatsiya anonim tarzda yuborilganmi",
  })
  @IsBoolean()
  is_anonymous: boolean;
}
