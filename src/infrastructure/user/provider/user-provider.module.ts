import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { userRepositoryProvider } from './repository/user-repository.provider';
import { UserRepository } from '../../../domain/user/port/repository/user-repository';
import { GetUserService } from '../../../domain/user/service/get-user-service';
import { getUserServiceProvider } from './service/get-user-service.provider';
import { GetUserHandler } from '../../../application/user/query/get-user.handler';
import { UserMapper } from '../adapter/mapper/user-mapper';
import { RoleEntity } from '../../../infrastructure/role/entity/role.entity';
import { roleRepositoryProvider } from '../../../infrastructure/role/provider/repository/role-repository.provider';
import { CreateUserService } from 'src/domain/user/service/create-user-service';
import { RoleRepository } from 'src/domain/role/port/repository/role-repository';
import { createUserServiceProvider } from './service/create-user-service.provider';
import { CreateUserHandler } from 'src/application/user/command/create-user.handler';
import { PgUserRepository } from '../adapter/repository/pg-user-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
    UserMapper,
  ],
  providers: [
    // {
    //   provide: GetUserListService,
    //   inject: [UserRepository],
    //   useFactory: getUserListServiceProvider,
    // },
    { provide: UserRepository, useClass: PgUserRepository },
    {
      provide: GetUserService,
      inject: [UserRepository],
      useFactory: getUserServiceProvider,
    },
    // {
    //   provide: DeleteUserService,
    //   inject: [UserRepository],
    //   useFactory: deleteUserServiceProvider,
    // },
    {
      provide: CreateUserService,
      inject: [UserRepository, RoleRepository],
      useFactory: createUserServiceProvider,
    },
    // {
    //   provide: UpdateUserService,
    //   inject: [UserRepository],
    //   useFactory: updateUserServiceProvider,
    // },
    // {
    //   provide: LoginUserService,
    //   inject: [UserRepository, JwtService],
    //   useFactory: loginUserServiceProvider,
    // },
    UserMapper,
    GetUserHandler,
    // DeleteUserHandler,
    CreateUserHandler,
    // UpdateUserHandler,
    // GetUserListHandler,
    userRepositoryProvider,
    roleRepositoryProvider,
  ],
  exports: [
    GetUserService,
    GetUserHandler,
    UserRepository,
    CreateUserService,
    CreateUserHandler,
  ],
})
export class UserProviderModule {}
