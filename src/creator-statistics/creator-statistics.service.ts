import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatorStatistic } from "./models/creator-statistic.model";
import { CreateCreatorStatisticDto } from "./dto/create-creator-statistic.dto";
import { UpdateCreatorStatisticDto } from "./dto/update-creator-statistic.dto";

@Injectable()
export class CreatorStatisticsService {
  constructor(
    @InjectModel(CreatorStatistic)
    private creatorStatRepo: typeof CreatorStatistic
  ) {}

  async create(dto: CreateCreatorStatisticDto): Promise<CreatorStatistic> {
    return await this.creatorStatRepo.create(dto);
  }

  async findAll(): Promise<CreatorStatistic[]> {
    return await this.creatorStatRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<CreatorStatistic> {
    const stat = await this.creatorStatRepo.findByPk(id, {
      include: { all: true },
    });
    if (!stat)
      throw new NotFoundException(`CreatorStatistic with ID ${id} not found`);
    return stat;
  }

  async update(
    id: number,
    dto: UpdateCreatorStatisticDto
  ): Promise<CreatorStatistic> {
    const stat = await this.findOne(id);
    return await stat.update(dto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const stat = await this.findOne(id);
    await stat.destroy();
    return { message: `CreatorStatistic with ID ${id} deleted` };
  }
}
