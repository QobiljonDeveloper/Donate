import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Notification } from "./models/notification.model";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @ApiOperation({
    summary: "Xabar yaratiladi",
  })
  @ApiResponse({
    status: 201,
    description: "Xabar ni yataish",
    type: Notification,
  })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }
  @ApiOperation({
    summary: "Barcha Xabarlarni olish",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha Xabarlarni olish",
    type: [Notification],
  })
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }
  @ApiOperation({
    summary: "Xabarniid sibo'yicha olish",
  })
  @ApiResponse({
    status: 200,
    description: "Xabarni idsi bo'yicha olish",
    type: Notification,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Xabarni yangilash",
  })
  @ApiResponse({
    status: 200,
    description: "Xabarni yangilash",
    type: Notification,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }
  @ApiOperation({
    summary: "Xabarni o'chirish",
  })
  @ApiResponse({
    status: 200,
    description: "Xabarni o'chirish",
    type: Notification,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
