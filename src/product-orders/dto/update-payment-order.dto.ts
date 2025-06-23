import { PartialType } from '@nestjs/swagger';
import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class UpdatePaymentOrderDto extends PartialType(CreatePaymentOrderDto) {}
