import { Module } from '@nestjs/common';
import { UserProviderModule } from './provider/user-provider.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [UserProviderModule],
  controllers: [UserController],
})
export class UserModule {}
