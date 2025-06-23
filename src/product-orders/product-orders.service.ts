import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductOrder } from "./models/product-order.model";
import { CreatePaymentOrderDto } from "./dto/create-payment-order.dto";
import { UpdatePaymentOrderDto } from "./dto/update-payment-order.dto";

@Injectable()
export class PaymentOrdersService {
  constructor(
    @InjectModel(ProductOrder)
    private paymentOrderModel: typeof ProductOrder
  ) {}

  async create(createDto: CreatePaymentOrderDto): Promise<ProductOrder> {
    const existing = await this.paymentOrderModel.findOne({
      where: {
        buyerId: createDto.buyerId,
        productId: createDto.productId,
        kuryerId: createDto.kuryerId,
        status: createDto.status,
      },
    });

    if (existing) {
      throw new ConflictException("Bu to‘lov buyurtmasi allaqachon mavjud");
    }

    return this.paymentOrderModel.create(createDto);
  }
  async findAll(): Promise<ProductOrder[]> {
    return this.paymentOrderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<ProductOrder> {
    const order = await this.paymentOrderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) {
      throw new NotFoundException(`PaymentOrder id=${id} topilmadi`);
    }
    return order;
  }

  async update(
    id: number,
    updateDto: UpdatePaymentOrderDto
  ): Promise<ProductOrder> {
    const order = await this.paymentOrderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`PaymentOrder id=${id} topilmadi`);
    }

    await order.update(updateDto);
    return order;
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.paymentOrderModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`PaymentOrder id=${id} topilmadi`);
    }

    return `PaymentOrder id=${id} o‘chirildi`;
  }
}
