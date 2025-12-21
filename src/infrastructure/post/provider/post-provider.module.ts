import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.entity';
import { UserRepository } from '../../../domain/user/port/repository/user-repository';
import { PostMapper } from '../adapter/mapper/post-mapper';
import { createPostServiceProvider } from './service/create-post-service.provider';
import { PgPostRepository } from '../adapter/repository/pg-post-repository';
import { UserEntity } from '../../user/entity/user.entity';
import { PostRepository } from '../../../domain/post/port/repository/post-repository';
import { CreatePostsService } from 'src/domain/post/service/create-post-service';
import { CreatePostHandler } from 'src/application/post/command/create-post.handler';
import { postRepositoryProvider } from './repository/post-repository.provider';
import { UserProviderModule } from 'src/infrastructure/user/provider/user-provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PostEntity]),
    PostMapper,
    UserProviderModule
  ],
  providers: [
    // {
    //   provide: GetUserListService,
    //   inject: [UserRepository],
    //   useFactory: getUserListServiceProvider,
    // },
    { provide: PostRepository, useClass: PgPostRepository },
    // {
    //   provide: GetUserService,
    //   inject: [UserRepository],
    //   useFactory: getUserServiceProvider,
    // },
    // {
    //   provide: DeleteUserService,
    //   inject: [UserRepository],
    //   useFactory: deleteUserServiceProvider,
    // },
    {
      provide: CreatePostsService,
      inject: [PostRepository, UserRepository],
      useFactory: createPostServiceProvider,
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
    PostMapper,
    // GetUserHandler,
    // DeleteUserHandler,
    CreatePostHandler,
    // UpdateUserHandler,
    // GetUserListHandler,
    postRepositoryProvider,
  ],
  exports: [
    PostRepository,
    CreatePostsService,
    CreatePostHandler,
  ],
})
export class PostProviderModule {}
