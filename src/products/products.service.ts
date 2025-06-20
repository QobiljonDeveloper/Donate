import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./models/product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const exists = await this.productModel.findOne({
      where: { name: createProductDto.name },
    });

    if (exists) {
      throw new ConflictException("Bunday nomdagi product allaqachon mavjud");
    }

    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      include: { all: true },
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} topilmadi`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const [affectedRows, [updatedProduct]] = await this.productModel.update(
      updateProductDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedRows === 0) {
      throw new NotFoundException(`Product #${id} topilmadi`);
    }

    return updatedProduct;
  }
  async remove(id: number): Promise<string> {
    const deleted = await this.productModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`Product #${id} topilmadi`);
    }

    return `Product #${id} muvaffaqiyatli o‘chirildi`;
  }
}
