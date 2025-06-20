import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "../../products/models/product.model";

interface IProductImagesCreationAttr {
  productId: number;
  image_url: string;
  is_main: boolean;
}

@Table({ tableName: "prudct_img", createdAt: true, updatedAt: false })
export class ProductImage extends Model<
  ProductImage,
  IProductImagesCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare image_url: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_main: boolean;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
