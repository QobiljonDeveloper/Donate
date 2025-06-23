import { Module } from "@nestjs/common";
import { PaymentOrdersService } from "./product-orders.service";
import { PaymentOrdersController } from "./product-orders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductOrder } from "./models/product-order.model";

@Module({
  imports: [SequelizeModule.forFeature([ProductOrder])],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
