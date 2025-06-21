import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Role } from "./models/role.model";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Role yaratish" })
  @ApiResponse({
    status: 201,
    description: "Role yartaish",
    type: Role,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @ApiOperation({ summary: "Rolelarni barchasini olish" })
  @ApiResponse({
    status: 200,
    description: "Rolelarni barchasini olish",
    type: [Role],
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "Rolelarni id bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Rolelarni id bo'yicha olish",
    type: Role,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: "Rolelarni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Rolelarni yangilash",
    type: Role,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Rolelarni o'chirib tashlash" })
  @ApiResponse({
    status: 200,
    description: "Rolelarni o'chirish",
    type: Role,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(+id);
  }
}
