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

@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  async createSocial(@Body() createSocialDto: CreateSocialDto) {
    return this.socialService.createSocial(createSocialDto);
  }

  @Get()
  async getAllSocials(): Promise<Social[]> {
    return this.socialService.getAllSocials();
  }

  @Get(":id")
  async getSocialById(@Param("id") id: string) {
    return this.socialService.getSocialById(+id);
  }

  @Patch(":id")
  updateSocial(
    @Param("id") id: string,
    @Body() updateSocialDto: UpdateSocialDto
  ) {
    return this.socialService.updateSocial(+id, updateSocialDto);
  }

  @Delete(":id")
  removeSocial(@Param("id") id: string) {
    return this.socialService.removeSocial(+id);
  }
}
