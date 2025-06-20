import { Module } from "@nestjs/common";
import { ProductImagesService } from "./product_images.service";
import { ProductImagesController } from "./product_images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductImage } from "./models/product_image.mode";

@Module({
  imports: [SequelizeModule.forFeature([ProductImage])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
