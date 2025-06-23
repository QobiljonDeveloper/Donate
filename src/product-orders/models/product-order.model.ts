import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Product } from "../../products/models/product.model";
import { Kuryer } from "../../kuryer/models/kuryer.model";
import { Payment } from "../../payment/models/payment.model";

export enum PaymentOrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CACELLED = "cancelled",
}

export enum DeliveryStatus {
  PENDING = "pending",
  ON_THE_WAY = "on-the-way",
  DELIVERED = "delivered",
}

interface IPaymentOrderCreationAttr {
  buyerId: number;
  productId: number;
  quantitiy: number;
  total_price: number;
  status: PaymentOrderStatus;
  delivery_address: string;
  phone_number: string;
  kuryerId: number;
  delivery_status: DeliveryStatus;
}

@Table({ tableName: "payment-order", createdAt: true, updatedAt: false })
export class ProductOrder extends Model<
  ProductOrder,
  IPaymentOrderCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantitiy: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentOrderStatus)),
    allowNull: false,
  })
  declare status: PaymentOrderStatus;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare delivery_address: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare phone_number: string;

  @Column({
    type: DataType.ENUM(...Object.values(DeliveryStatus)),
    allowNull: false,
  })
  declare delivery_status: DeliveryStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare buyerId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @ForeignKey(() => Kuryer)
  @Column({
    type: DataType.INTEGER,
  })
  declare kuryerId: number;

  @BelongsTo(() => User)
  buyer: User;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Kuryer)
  kuryer: Kuryer;

  @HasMany(() => Payment)
  payment: Payment[];
}
