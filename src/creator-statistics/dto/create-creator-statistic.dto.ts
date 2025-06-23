import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateCreatorStatisticDto {
  @ApiProperty({
    example: 1,
    description: "Creator (foydalanuvchi) ID raqami",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  creatorId: number;

  @ApiProperty({
    example: 500,
    description: "Jami yig‘ilgan donationlar soni (yoki summasi)",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  total_donations: number;

  @ApiProperty({
    example: 25,
    description: "Uni qo‘llab-quvvatlagan foydalanuvchilar soni",
  })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  total_supporters: number;
}
