import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.entity';
import { UserRepository } from '../../../domain/user/port/repository/user-repository';
import { PostMapper } from '../adapter/mapper/post-mapper';
import { createPostServiceProvider } from './service/create-post-service.provider';
import { PgPostRepository } from '../adapter/repository/pg-post-repository';
import { UserEntity } from '../../user/entity/user.entity';
import { PostRepository } from '../../../domain/post/port/repository/post-repository';
import { CreatePostsService } from '../../../domain/post/service/create-post-service';
import { CreatePostHandler } from '../../../application/post/command/create-post.handler';
import { postRepositoryProvider } from './repository/post-repository.provider';
import { UserProviderModule } from '../../../infrastructure/user/provider/user-provider.module';
import { GetAllPostService } from '../../../domain/post/service/get-all-post-service';
import { getAllPostServiceProvider } from './service/get-all-post-service.provider';
import { GetAllPostHandler } from 'src/application/post/query/get-all-post.hadler';
import { UpdatePostHandler } from 'src/application/post/command/update-post.handler';
import { UpdatePostsService } from 'src/domain/post/service/update-post-service';
import { updatePostServiceProvider } from './service/update-post-service.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PostEntity]),
    PostMapper,
    UserProviderModule
  ],
  providers: [
    {
      provide: GetAllPostService,
      inject: [PostRepository],
      useFactory: getAllPostServiceProvider,
    },
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
    {
      provide: UpdatePostsService,
      inject: [PostRepository, UserRepository],
      useFactory: updatePostServiceProvider,
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
    GetAllPostHandler,
    CreatePostHandler,
    UpdatePostHandler,
    // UpdateUserHandler,
    // GetUserListHandler,
    postRepositoryProvider,
  ],
  exports: [
    PostRepository,
    CreatePostsService,
    UpdatePostsService,
    CreatePostHandler,
    GetAllPostHandler,
    UpdatePostHandler
  ],
})
export class PostProviderModule {}
