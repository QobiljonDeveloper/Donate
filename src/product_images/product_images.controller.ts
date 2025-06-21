import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductImagesService } from "./product_images.service";
import { CreateProductImageDto } from "./dto/create-product_image.dto";
import { UpdateProductImageDto } from "./dto/update-product_image.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductImage } from "./models/product_image.mode";

@Controller("images")
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mahsulot rasmi qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Rasm muvaffaqiyatli qo‘shildi",
    type: ProductImage,
  })
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImagesService.create(createProductImageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mahsulot rasmlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Rasmlar ro‘yxati",
    type: [ProductImage],
  })
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali rasmni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan mahsulot rasmi",
    type: ProductImage,
  })
  findOne(@Param("id") id: string) {
    return this.productImagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mahsulot rasmini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Rasm muvaffaqiyatli yangilandi",
    type: ProductImage,
  })
  update(
    @Param("id") id: string,
    @Body() updateProductImageDto: UpdateProductImageDto
  ) {
    return this.productImagesService.update(+id, updateProductImageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mahsulot rasmini o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Rasm muvaffaqiyatli o‘chirildi",
    type: ProductImage,
  })
  remove(@Param("id") id: string) {
    return this.productImagesService.remove(+id);
  }
}
