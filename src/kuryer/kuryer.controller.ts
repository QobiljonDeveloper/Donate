import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KuryerService } from './kuryer.service';
import { CreateKuryerDto } from './dto/create-kuryer.dto';
import { UpdateKuryerDto } from './dto/update-kuryer.dto';

@Controller('kuryer')
export class KuryerController {
  constructor(private readonly kuryerService: KuryerService) {}

  @Post()
  create(@Body() createKuryerDto: CreateKuryerDto) {
    return this.kuryerService.create(createKuryerDto);
  }

  @Get()
  findAll() {
    return this.kuryerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kuryerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKuryerDto: UpdateKuryerDto) {
    return this.kuryerService.update(+id, updateKuryerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kuryerService.remove(+id);
  }
}
