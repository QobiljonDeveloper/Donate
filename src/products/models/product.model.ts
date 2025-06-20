import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { User } from "../../users/models/user.model";
import { ProductImage } from "../../product_images/models/product_image.mode";

interface IProductCreationAttr {
  creatorId: number;
  name: string;
  description: string;
  in_stock: number;
  is_avialable: boolean;
  price: number;
  categoryId: number;
}

@Table({ tableName: "products", createdAt: true, updatedAt: false })
export class Product extends Model<Product, IProductCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare in_stock: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_avialable: boolean;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare price: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  creatorId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => User)
  creator: User;

  @HasMany(() => ProductImage)
  productImage: ProductImage[];
}
