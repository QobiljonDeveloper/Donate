import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentOrdersService } from "./product-orders.service";
import { CreatePaymentOrderDto } from "./dto/create-payment-order.dto";
import { UpdatePaymentOrderDto } from "./dto/update-payment-order.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductOrder } from "./models/product-order.model";

@ApiTags("Product Order")
@Controller("payment-orders")
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi payment order yaratish" })
  @ApiResponse({
    status: 201,
    description: "Payment order muvaffaqiyatli yaratildi",
    type: ProductOrder,
  })
  create(@Body() createPaymentOrderDto: CreatePaymentOrderDto) {
    return this.paymentOrdersService.create(createPaymentOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha payment orderlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha payment orderlar ro‘yxati",
    type: [ProductOrder],
  })
  findAll() {
    return this.paymentOrdersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta payment orderni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan payment order",
    type: ProductOrder,
  })
  findOne(@Param("id") id: string) {
    return this.paymentOrdersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Payment orderni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Payment order muvaffaqiyatli yangilandi",
    type: ProductOrder,
  })
  update(
    @Param("id") id: string,
    @Body() updatePaymentOrderDto: UpdatePaymentOrderDto
  ) {
    return this.paymentOrdersService.update(+id, updatePaymentOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Payment orderni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Payment order muvaffaqiyatli o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.paymentOrdersService.remove(+id);
  }
}
