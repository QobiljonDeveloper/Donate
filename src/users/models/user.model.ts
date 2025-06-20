import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Notification } from "../../notifications/models/notification.model";
import { Donation } from "../../donations/models/donation.model";
import { Social } from "../../social/models/social.model";
import { CreatorSocial } from "../../creator-social/model/creator-social.model";
import { Product } from "../../products/models/product.model";

export enum UsersRole {
  CREATOR = "creator",
  USER = "user",
}

interface IUserCreationAttr {
  full_name: string;
  email: string;
  role: UsersRole;
  bio: string;
  avatar_url: string;
  banner_url: string;
}
@Table({ tableName: "user", createdAt: true, updatedAt: false })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM(...Object.values(UsersRole)),
    allowNull: false,
  })
  declare role: UsersRole;
  @Column({
    type: DataType.TEXT,
  })
  declare bio: string;

  @Column({
    type: DataType.TEXT,
  })
  declare avatar_url: string;

  @Column({
    type: DataType.TEXT,
  })
  declare banner_url: string;

  @HasMany(() => Notification)
  notification: Notification[];

  @HasMany(() => Donation)
  donation: Donation[];

  @BelongsToMany(() => Social, () => CreatorSocial)
  social: Social[];

  @HasMany(() => Product)
  product: Product[];
}
