import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

export enum paymentMethod {
  CLICK = "click",
  PAYME = "payme",
  UZUM = "uzum",
  UZCARD = "uzcard",
  HUMO = "humo",
}

interface IDonationCreationAttr {
  supporterId: number;
  creatorId: number;
  amount: number;
  message: string;
  payment_method: paymentMethod;
  is_anonymous: boolean;
}

@Table({ tableName: "donations", createdAt: true, updatedAt: false })
export class Donation extends Model<Donation, IDonationCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.TEXT,
  })
  declare message: string;

  @Column({
    type: DataType.ENUM(...Object.values(paymentMethod)),
    allowNull: false,
  })
  declare payment_method: paymentMethod;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_anonymous: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare supporterId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare creatorId: number;

  @BelongsTo(() => User, "supporterId")
  supporter: User;


  @BelongsTo(() => User, "creatorId")
  creator: User;
}
