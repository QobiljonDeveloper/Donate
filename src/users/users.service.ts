import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException("Bu email bilan admin allaqachon mavjud");
    }

    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException(`User ID ${id} topilmadi`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [updatedCount, [updated]] = await this.userModel.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return `${id} - IDli user o‘chirildi`;
  }
}
