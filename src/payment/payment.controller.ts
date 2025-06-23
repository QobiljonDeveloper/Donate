import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Payment } from "./models/payment.model";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi payment yaratish" })
  @ApiResponse({
    status: 201,
    description: "Payment muvaffaqiyatli yaratildi",
    type: Payment,
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha paymentlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha paymentlar ro‘yxati",
    type: [Payment],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta paymentni olish" })
  @ApiResponse({ status: 200, description: "Topilgan payment", type: Payment })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Paymentni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Payment muvaffaqiyatli yangilandi",
    type: Payment,
  })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Paymentni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Payment muvaffaqiyatli o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
