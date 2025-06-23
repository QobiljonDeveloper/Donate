import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { SavedItemsService } from "./saved-items.service";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SavedItem } from "./models/saved-item.model";

@ApiTags("SavedItems")
@Controller("saved-items")
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi saqlangan item yaratish" })
  @ApiResponse({
    status: 201,
    description: "Item muvaffaqiyatli saqlandi",
    type: SavedItem,
  })
  create(@Body() dto: CreateSavedItemDto) {
    return this.savedItemsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha saqlangan itemlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Saqlangan itemlar ro‘yxati",
    type: [SavedItem],
  })
  findAll() {
    return this.savedItemsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta saqlangan itemni olish" })
  @ApiResponse({
    status: 200,
    description: "Saqlangan item topildi",
    type: SavedItem,
  })
  findOne(@Param("id") id: string) {
    return this.savedItemsService.findOne(+id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Saqlangan itemni o‘chirish" })
  @ApiResponse({ status: 200, description: "Item o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.savedItemsService.remove(+id);
  }
}
