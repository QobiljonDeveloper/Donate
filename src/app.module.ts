import { Module } from "@nestjs/common";
import { SocialModule } from "./social/social.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Social } from "./social/models/social.model";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { NotificationsModule } from "./notifications/notifications.module";
import { Notification } from "./notifications/models/notification.model";
import { DonationsModule } from "./donations/donations.module";
import { KuryerModule } from "./kuryer/kuryer.module";
import { Kuryer } from "./kuryer/models/kuryer.model";
import { Donation } from "./donations/models/donation.model";
import { CreatorSocialModule } from "./creator-social/creator-social.module";
import { CreatorSocial } from "./creator-social/model/creator-social.model";
import { ProductsModule } from "./products/products.module";
import { Product } from "./products/models/product.model";
import { ProductImagesModule } from "./product_images/product_images.module";
import { ProductImage } from "./product_images/models/product_image.mode";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/models/role.model";
import { AdminRoleModel } from "./admin/models/admin-role.model";
import { CreatorStatisticsModule } from "./creator-statistics/creator-statistics.module";
import { PaymentOrdersModule } from "./product-orders/product-orders.module";
import { ProductOrder } from "./product-orders/models/product-order.model";
import { PaymentModule } from "./payment/payment.module";
import { Payment } from "./payment/models/payment.model";
import { WithdrawsModule } from "./withdraws/withdraws.module";
import { Withdraw } from "./withdraws/models/withdraw.model";
import { SavedItemsModule } from "./saved-items/saved-items.module";
import { SavedItem } from "./saved-items/models/saved-item.model";
import { CreatorStatistic } from "./creator-statistics/models/creator-statistic.model";
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Social,
        Category,
        Admin,
        User,
        Notification,
        Kuryer,
        Donation,
        CreatorSocial,
        Product,
        ProductImage,
        Role,
        AdminRoleModel,
        ProductOrder,
        Payment,
        Withdraw,
        SavedItem,
        CreatorStatistic,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    SocialModule,
    CategoryModule,
    AdminModule,
    UsersModule,
    NotificationsModule,
    DonationsModule,
    KuryerModule,
    CreatorSocialModule,
    ProductsModule,
    ProductImagesModule,
    RoleModule,
    CreatorStatisticsModule,
    PaymentOrdersModule,
    PaymentModule,
    WithdrawsModule,
    SavedItemsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
