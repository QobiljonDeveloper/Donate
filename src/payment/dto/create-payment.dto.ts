import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { PaymentMethod, PaymentStatus } from "../models/payment.model";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "Payment qilinadigan buyurtmaning ID raqami",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 3,
    description: "To‘lovni amalga oshirayotgan foydalanuvchining ID si",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: PaymentMethod.CARD,
    enum: PaymentMethod,
    description: "To‘lov usuli: karta yoki naqd",
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @ApiProperty({
    example: PaymentStatus.PENDING,
    enum: PaymentStatus,
    description: "To‘lov holati: pending, cancelled yoki success",
  })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;
}
