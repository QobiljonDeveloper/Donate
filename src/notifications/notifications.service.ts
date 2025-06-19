import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notifModel: typeof Notification
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.notifModel.create(createNotificationDto);
  }

  findAll() {
    return this.notifModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const existing = await this.notifModel.findByPk(id, {
      include: { all: true },
    });

    if (!existing) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return existing;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const [updatedCount, [updated]] = await this.notifModel.update(
      updateNotificationDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`Notification ID ${id} topilmadi`);
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.notifModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return `${id} - IDli user o‘chirildi`;
  }
}
