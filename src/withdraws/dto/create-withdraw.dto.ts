import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { WithdrawStatus } from "../models/withdraw.model";

export class CreateWithdrawDto {
  @ApiProperty({ example: 1000.5, description: "Pul yechish summasi" })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: WithdrawStatus.PENDING,
    enum: WithdrawStatus,
    description: "Yechim statusi",
  })
  @IsEnum(WithdrawStatus)
  @IsNotEmpty()
  status: WithdrawStatus;

  @ApiProperty({ example: "5%", description: "Platforma komissiyasi" })
  @IsString()
  @IsNotEmpty()
  site_fee: string;

  @ApiProperty({
    example: 3,
    description: "Yechim so‘ragan foydalanuvchi ID si",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  creatorId: number;
}
