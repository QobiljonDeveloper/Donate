import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { JwtAuthGuard } from "../common/guards/jwt.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { SelfGuard } from "../common/guards/self.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Foydalanuvchi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi yarataish",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: "Barcha Foydalanuvchilarni olish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilarni olish",
    type: [User],
  })
  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchilarni id bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilarni id bo'yicha olish",
    type: User,
  })
  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchini yangilash",
    type: User,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: "Foydalanuvchini o'chirib tashlash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchini o'chirib tashlash",
    type: User,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
