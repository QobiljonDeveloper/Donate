import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Donation } from "./models/donation.model";

@Controller("donations")
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @ApiOperation({ summary: "Donatsiya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Donatsiya yaratildi",
    type: Donation,
  })
  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

@ApiOperation({ summary: "Barcha donatsiyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha donatsiyalar ro'yxati",
    type: [Donation],
  })
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @ApiOperation({ summary: "Donatsiyani ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "ID orqali donatsiyani olish",
    type: Donation,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.donationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Donatsiyani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Donatsiya muvaffaqiyatli yangilandi",
    type: Donation,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDonationDto: UpdateDonationDto
  ) {
    return this.donationsService.update(+id, updateDonationDto);
  }

  @ApiOperation({ summary: "Donatsiyani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Donatsiya muvaffaqiyatli o'chirildi",
    type: Donation,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.donationsService.remove(+id);
  }
}
