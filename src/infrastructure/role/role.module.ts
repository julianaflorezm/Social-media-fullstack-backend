import { Module } from '@nestjs/common';
import { RoleProviderModule } from './provider/role-provider.module';

@Module({
  imports: [RoleProviderModule],
})
export class RoleModule {}
