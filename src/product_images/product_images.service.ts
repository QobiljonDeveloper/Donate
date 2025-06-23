import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductImage } from "./models/product_image.mode";
import { CreateProductImageDto } from "./dto/create-product_image.dto";
import { UpdateProductImageDto } from "./dto/update-product_image.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImage)
    private readonly productImageModel: typeof ProductImage,
    private readonly filesService: FilesService
  ) {}

  async create(dto: CreateProductImageDto): Promise<ProductImage> {
    const fileName = await this.filesService.saveFile(dto.image_url);
    return this.productImageModel.create({
      productId: dto.productId,
      is_main: dto.is_main,
      image_url: fileName,
    });
  }

  async findAll(): Promise<ProductImage[]> {
    return this.productImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<ProductImage> {
    const image = await this.productImageModel.findByPk(id, {
      include: { all: true },
    });
    if (!image) throw new NotFoundException(`Image #${id} topilmadi`);
    return image;
  }

  async update(id: number, dto: UpdateProductImageDto): Promise<ProductImage> {
    const [count, [updated]] = await this.productImageModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (!count) throw new NotFoundException(`Image #${id} topilmadi`);
    return updated;
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.productImageModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException(`Image #${id} topilmadi`);
    return `Image #${id} muvaffaqiyatli o‘chirildi`;
  }
}
