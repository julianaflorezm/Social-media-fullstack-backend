import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roleRepositoryProvider } from './repository/role-repository.provider';
import { RoleEntity } from '../entity/role.entity';
import { RoleRepository } from '../../../domain/role/port/repository/role-repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [roleRepositoryProvider],
  exports: [RoleRepository],
})
export class RoleProviderModule {}
