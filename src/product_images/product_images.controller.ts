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

@ApiTags("ProductImages")
@Controller("images")
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mahsulot rasmi yuklash" })
  @ApiResponse({
    status: 201,
    description: "Rasm saqlandi",
    type: ProductImage,
  })
  create(@Body() dto: CreateProductImageDto) {
    return this.productImagesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha rasmlarni olish" })
  @ApiResponse({ status: 200, type: [ProductImage] })
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta rasmni olish" })
  @ApiResponse({ status: 200, type: ProductImage })
  findOne(@Param("id") id: string) {
    return this.productImagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Rasmni yangilash" })
  @ApiResponse({ status: 200, type: ProductImage })
  update(@Param("id") id: string, @Body() dto: UpdateProductImageDto) {
    return this.productImagesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Rasmni o‘chirish" })
  @ApiResponse({ status: 200, description: "Rasm o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.productImagesService.remove(+id);
  }
}
