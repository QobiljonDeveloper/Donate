import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreatorStatisticsService } from "./creator-statistics.service";
import { CreateCreatorStatisticDto } from "./dto/create-creator-statistic.dto";
import { UpdateCreatorStatisticDto } from "./dto/update-creator-statistic.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatorStatistic } from "./models/creator-statistic.model";
@ApiTags("CreatorStatistics")
@Controller("creator-statistics")
export class CreatorStatisticsController {
  constructor(
    private readonly creatorStatisticsService: CreatorStatisticsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi statistikani yaratish" })
  @ApiResponse({
    status: 201,
    description: "Statistika yaratildi",
    type: CreatorStatistic,
  })
  create(@Body() dto: CreateCreatorStatisticDto) {
    return this.creatorStatisticsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha statistikalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha statistikalar ro‘yxati",
    type: [CreatorStatistic],
  })
  findAll() {
    return this.creatorStatisticsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta statistikani olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan statistika",
    type: CreatorStatistic,
  })
  findOne(@Param("id") id: string) {
    return this.creatorStatisticsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Statistikani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Statistika yangilandi",
    type: CreatorStatistic,
  })
  update(@Param("id") id: string, @Body() dto: UpdateCreatorStatisticDto) {
    return this.creatorStatisticsService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Statistikani o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Statistika o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.creatorStatisticsService.remove(+id);
  }
}
