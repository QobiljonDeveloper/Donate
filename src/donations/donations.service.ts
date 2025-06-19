import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Donation } from "./models/donation.model";

@Injectable()
export class DonationsService {
  constructor(@InjectModel(Donation) private donationModel: typeof Donation) {}
  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    return await this.donationModel.create(createDonationDto);
  }
  findAll() {
    return this.donationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const donation = await this.donationModel.findByPk(id);
    if (!donation) throw new NotFoundException(`Admin ID ${id} topilmadi`);
    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const donation = await this.donationModel.findByPk(id);
    if (!donation) {
      throw new NotFoundException(`donation id=${id} topilmadi`);
    }

    await donation.update(updateDonationDto);
    return donation;
  }

  async remove(id: number) {
    const deleted = await this.donationModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`Donation id=${id} topilmadi`);
    }

    return `Donation id=${id} o'chirildi`;
  }
}
