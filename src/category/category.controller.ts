import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./models/category.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: "Category yaratish",
  })
  @ApiResponse({
    status: 201,
    description: "Category yarataish",
    type: Category,
  })
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }
  @ApiOperation({ summary: "Barcha Categorylarni olsih" })
  @ApiResponse({
    status: 200,

    description: "Barcha Categorylarni olish",
    type: [Category],
  })
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
  @ApiOperation({ summary: "Categorylarni id bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Categoryni id bo'yicha olish",
    type: Category,
  })
  @Get(":id")
  getCategoryById(@Param("id") id: string) {
    return this.categoryService.getCategoryById(+id);
  }
  @ApiOperation({
    summary: "Category nomlarini yangilash",
  })
  @ApiResponse({
    status: 200,
    description: "Categoryni yangilash",
    type: Category,
  })
  @Patch(":id")
  updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateSocial(+id, updateCategoryDto);
  }
  @ApiOperation({ summary: "Categoryni O'chirib tashlash" })
  @ApiResponse({
    status: 200,
    description: "Categoryni o'chirib tashlash",
    type: Category,
  })
  @Delete(":id")
  removeCategory(@Param("id") id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
