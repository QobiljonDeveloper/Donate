import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WithdrawsService } from "./withdraws.service";
import { CreateWithdrawDto } from "./dto/create-withdraw.dto";
import { UpdateWithdrawDto } from "./dto/update-withdraw.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Withdraw } from "./models/withdraw.model";

@ApiTags("Withdraws")
@Controller("withdraws")
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi withdraw so‘rovi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Withdraw muvaffaqiyatli yaratildi",
    type: Withdraw,
  })
  create(@Body() createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawsService.create(createWithdrawDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha withdraw so‘rovlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Withdrawlar ro‘yxati",
    type: [Withdraw],
  })
  findAll() {
    return this.withdrawsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta withdraw so‘rovini olish" })
  @ApiResponse({ status: 200, description: "Withdraw topildi", type: Withdraw })
  findOne(@Param("id") id: string) {
    return this.withdrawsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Withdraw so‘rovini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Withdraw muvaffaqiyatli yangilandi",
    type: Withdraw,
  })
  update(
    @Param("id") id: string,
    @Body() updateWithdrawDto: UpdateWithdrawDto
  ) {
    return this.withdrawsService.update(+id, updateWithdrawDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Withdraw so‘rovini o‘chirish" })
  @ApiResponse({ status: 200, description: "Withdraw o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.withdrawsService.remove(+id);
  }
}
