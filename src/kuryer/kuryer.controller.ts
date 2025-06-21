import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { KuryerService } from "./kuryer.service";
import { CreateKuryerDto } from "./dto/create-kuryer.dto";
import { UpdateKuryerDto } from "./dto/update-kuryer.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Kuryer } from "./models/kuryer.model";

@ApiTags("Kuryerlar")
@Controller("kuryer")
export class KuryerController {
  constructor(private readonly kuryerService: KuryerService) {}

  @Post()
  @ApiOperation({ summary: "Yangi kuryer yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kuryer muvaffaqiyatli yaratildi",
    type: Kuryer,
  })
  create(@Body() createKuryerDto: CreateKuryerDto) {
    return this.kuryerService.create(createKuryerDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kuryerlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kuryerlar ro‘yxati",
    type: [Kuryer],
  })
  findAll() {
    return this.kuryerService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta kuryerni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan kuryer",
    type: Kuryer,
  })
  findOne(@Param("id") id: string) {
    return this.kuryerService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Kuryerni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kuryer muvaffaqiyatli yangilandi",
    type: Kuryer,
  })
  update(@Param("id") id: string, @Body() updateKuryerDto: UpdateKuryerDto) {
    return this.kuryerService.update(+id, updateKuryerDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kuryerni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Kuryer muvaffaqiyatli o‘chirildi",
    type: Kuryer,
  })
  remove(@Param("id") id: string) {
    return this.kuryerService.remove(+id);
  }
}
