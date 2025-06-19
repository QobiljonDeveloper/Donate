import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Kuryer } from "./models/kuryer.model";
import { CreateKuryerDto } from "./dto/create-kuryer.dto";
import { UpdateKuryerDto } from "./dto/update-kuryer.dto";

@Injectable()
export class KuryerService {
  constructor(@InjectModel(Kuryer) private kuryerModel: typeof Kuryer) {}

  async create(createKuryerDto: CreateKuryerDto): Promise<Kuryer> {
    const existing = await this.kuryerModel.findOne({
      where: { phone_number: createKuryerDto.phone_number },
    });

    if (existing) {
      throw new ConflictException("Bu telefon raqam bilan kuryer mavjud");
    }

    return this.kuryerModel.create(createKuryerDto);
  } 

  async findAll(): Promise<Kuryer[]> {
    return this.kuryerModel.findAll();
  }

  async findOne(id: number): Promise<Kuryer> {
    const kuryer = await this.kuryerModel.findByPk(id);
    if (!kuryer) {
      throw new NotFoundException(`Kuryer id=${id} topilmadi`);
    }
    return kuryer;
  }

  async update(id: number, updateKuryerDto: UpdateKuryerDto): Promise<Kuryer> {
    const kuryer = await this.kuryerModel.findByPk(id);
    if (!kuryer) {
      throw new NotFoundException(`Kuryer id=${id} topilmadi`);
    }

    await kuryer.update(updateKuryerDto);
    return kuryer;
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.kuryerModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`Kuryer id=${id} topilmadi`);
    }

    return `Kuryer id=${id} o'chirildi`;
  }
}
