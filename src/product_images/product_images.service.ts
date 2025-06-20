import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductImageDto } from "./dto/create-product_image.dto";
import { UpdateProductImageDto } from "./dto/update-product_image.dto";
import { ProductImage } from "./models/product_image.mode";

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImage)
    private productImageModel: typeof ProductImage
  ) {}

  async create(
    createProductImageDto: CreateProductImageDto
  ): Promise<ProductImage> {
    return this.productImageModel.create(createProductImageDto);
  }

  async findAll(): Promise<ProductImage[]> {
    return this.productImageModel.findAll({ include: { all: true } });
  }
  async findOne(id: number): Promise<ProductImage> {
    const image = await this.productImageModel.findByPk(id, {
      include: { all: true },
    });

    if (!image) {
      throw new NotFoundException(`ProductImage #${id} topilmadi`);
    }

    return image;
  }

  async update(
    id: number,
    updateProductImageDto: UpdateProductImageDto
  ): Promise<ProductImage> {
    const [updatedCount, [updatedImage]] = await this.productImageModel.update(
      updateProductImageDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`ProductImage #${id} topilmadi`);
    }

    return updatedImage;
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.productImageModel.destroy({
      where: { id },
    });

    if (deleted === 0) {
      throw new NotFoundException(`ProductImage #${id} topilmadi`);
    }

    return `ProductImage #${id} muvaffaqiyatli o‘chirildi`;
  }
}
