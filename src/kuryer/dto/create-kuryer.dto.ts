import { VehicleType } from "../models/kuryer.model";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Length,
  Matches,
} from "class-validator";

export class CreateKuryerDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Kuryerning to‘liq ismi",
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Kuryer telefon raqami",
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqam formati noto‘g‘ri (masalan, +998901234567)",
  })
  phone_number: string;

  @ApiProperty({ enum: VehicleType, description: "Transport turi" })
  @IsEnum(VehicleType, {
    message: "Noto‘g‘ri vehicle_type (foot | bike | car | motorcycle)",
  })
  vehicle_type: VehicleType;

  @ApiProperty({ example: "01A123BC", description: "Transport raqami" })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  vehicle_plate_number: string;

  @ApiProperty({ example: true, description: "Kuryer faolmi yo‘qmi" })
  @IsBoolean()
  is_active: boolean;
}
