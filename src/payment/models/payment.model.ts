import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ProductOrder } from "../../product-orders/models/product-order.model";
import { User } from "../../users/models/user.model";

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
}
export enum PaymentStatus {
  PENDING = "pending",
  CANCELLED = "cancelled",
  SUCCESS = "success",
}

interface IPaymentCreationAttr {
  orderId: number;
  userId: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
}

@Table({ tableName: "payment", createdAt: "paid_at", updatedAt: false })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  declare payment_method: PaymentMethod;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
  })
  declare status: PaymentStatus;

  @ForeignKey(() => ProductOrder)
  @Column({
    type: DataType.INTEGER,
  })
  declare orderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @BelongsTo(() => ProductOrder)
  product: ProductOrder;

  @BelongsTo(() => User)
  user: User;
}
