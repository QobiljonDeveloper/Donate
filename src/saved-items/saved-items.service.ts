import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SavedItem } from "./models/saved-item.model";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectModel(SavedItem) private savedItemRepo: typeof SavedItem
  ) {}

  async create(dto: CreateSavedItemDto): Promise<SavedItem> {
    return await this.savedItemRepo.create(dto);
  }

  async findAll(): Promise<SavedItem[]> {
    return await this.savedItemRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<SavedItem> {
    const item = await this.savedItemRepo.findByPk(id, {
      include: { all: true },
    });
    if (!item) throw new NotFoundException(`SavedItem with ID ${id} not found`);
    return item;
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    await item.destroy();
    return { message: `SavedItem with ID ${id} removed` };
  }
}
