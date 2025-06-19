import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatorSocialService } from './creator-social.service';
import { CreateCreatorSocialDto } from './dto/create-creator-social.dto';
import { UpdateCreatorSocialDto } from './dto/update-creator-social.dto';

@Controller('creator-social')
export class CreatorSocialController {
  constructor(private readonly creatorSocialService: CreatorSocialService) {}

  @Post()
  create(@Body() createCreatorSocialDto: CreateCreatorSocialDto) {
    return this.creatorSocialService.create(createCreatorSocialDto);
  }

  @Get()
  findAll() {
    return this.creatorSocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatorSocialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorSocialDto: UpdateCreatorSocialDto) {
    return this.creatorSocialService.update(+id, updateCreatorSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorSocialService.remove(+id);
  }
}
