import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './infrastructure/user/user.module';
import { RoleModule } from './infrastructure/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigFactory } from './infrastructure/config/database.config';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
