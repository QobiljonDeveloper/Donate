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

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(":id")
  getCategoryById(@Param("id") id: string) {
    return this.categoryService.getCategoryById(+id);
  }

  @Patch(":id")
  updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateSocial(+id, updateCategoryDto);
  }

  @Delete(":id")
  removeCategory(@Param("id") id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
