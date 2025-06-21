import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SocialService } from "./social.service";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { Social } from "./models/social.model";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  @ApiOperation({ summary: "Yangi ijtimoiy tarmoq yaratish" })
  @ApiResponse({
    status: 201,
    description: "Ijtimoiy tarmoq muvaffaqiyatli yaratildi",
    type: Social,
  })
  async createSocial(@Body() createSocialDto: CreateSocialDto) {
    return this.socialService.createSocial(createSocialDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ijtimoiy tarmoqlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoqlar ro'yxati",
    type: [Social],
  })
  async getAllSocials(): Promise<Social[]> {
    return this.socialService.getAllSocials();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta ijtimoiy tarmoqni olish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq topildi",
    type: Social,
  })
  async getSocialById(@Param("id") id: string) {
    return this.socialService.getSocialById(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Ijtimoiy tarmoq ma'lumotini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Ma'lumotlar muvaffaqiyatli yangilandi",
    type: Social,
  })
  updateSocial(
    @Param("id") id: string,
    @Body() updateSocialDto: UpdateSocialDto
  ) {
    return this.socialService.updateSocial(+id, updateSocialDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Ijtimoiy tarmoqni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq muvaffaqiyatli o‘chirildi",
    type: Social,
  })
  removeSocial(@Param("id") id: string) {
    return this.socialService.removeSocial(+id);
  }
}
