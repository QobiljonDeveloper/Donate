import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    const existing = await this.categoryModel.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existing) {
      throw new ConflictException("Bu kategoriya avval qo‘shilgan");
    }

    return this.categoryModel.create(createCategoryDto);
  }
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  getCategoryById(id: number): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  async updateSocial(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [rowsUpdated, [updatedSocial]] = await this.categoryModel.update(
      updateCategoryDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (rowsUpdated === 0) {
      throw new Error(`Social with id ${id} not found`);
    }

    return updatedSocial;
  }

  async removeCategory(id: number): Promise<string> {
    const result = await this.categoryModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id} - category o'chirildi`;
    }

    return `${id}- Bunday category yo'q`;
  }
}
