import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './infrastructure/user/user.module';
import { RoleModule } from './infrastructure/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigFactory } from './infrastructure/config/database.config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { PostModule } from './infrastructure/post/post.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostLikesModule } from './infrastructure/post-likes/post-likes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env/.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    AuthModule,
    PostModule,
    PostLikesModule
  ],
})
export class AppModule {}
