
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Withdraw } from "./models/withdraw.model";
import { CreateWithdrawDto } from "./dto/create-withdraw.dto";
import { UpdateWithdrawDto } from "./dto/update-withdraw.dto";

@Injectable()
export class WithdrawsService {
  constructor(@InjectModel(Withdraw) private withdrawRepo: typeof Withdraw) {}

  async create(createDto: CreateWithdrawDto): Promise<Withdraw> {
    return await this.withdrawRepo.create(createDto);
  }

  async findAll(): Promise<Withdraw[]> {
    return this.withdrawRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Withdraw> {
    const withdraw = await this.withdrawRepo.findByPk(id, {
      include: { all: true },
    });
    if (!withdraw)
      throw new NotFoundException(`Withdraw with id ${id} not found`);
    return withdraw;
  }

  async update(id: number, updateDto: UpdateWithdrawDto): Promise<Withdraw> {
    const withdraw = await this.findOne(id);
    return await withdraw.update(updateDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const withdraw = await this.findOne(id);
    await withdraw.destroy();
    return { message: `Withdraw with id ${id} successfully removed` };
  }
}
