import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Product } from "../../products/models/product.model";

interface ISavedItemsCreationAttr {
  userId: number;
  productId: number;
}

@Table({ tableName: "saved_items", createdAt: true, updatedAt: false })
export class SavedItem extends Model<SavedItem, ISavedItemsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
