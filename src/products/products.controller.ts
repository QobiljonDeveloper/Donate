import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Product } from "./models/product.model";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mahsulot yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot muvaffaqiyatli yaratildi",
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulotlar ro'yxati",
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali mahsulotni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan mahsulot",
    type: Product,
  })
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli yangilandi",
    type: Product,
  })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli o'chirildi",
    type: Product,
  })
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
