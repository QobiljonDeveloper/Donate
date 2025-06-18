import { Module } from "@nestjs/common";
import { SocialModule } from "./social/social.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Social } from "./social/models/social.model";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";

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
      models: [Social, Category, Admin],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    SocialModule,
    CategoryModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
