import { Module } from "@nestjs/common";
import { ProductImagesService } from "./product_images.service";
import { ProductImagesController } from "./product_images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductImage } from "./models/product_image.mode";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [SequelizeModule.forFeature([ProductImage]), FilesModule],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
