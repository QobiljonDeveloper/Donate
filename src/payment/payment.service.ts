import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.create(createPaymentDto);
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    return await payment.update(updatePaymentDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: `Payment with ID ${id} deleted successfully` };
  }
}
