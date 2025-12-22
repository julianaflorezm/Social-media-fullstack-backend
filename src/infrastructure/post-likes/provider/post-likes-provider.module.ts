import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikeEntity } from '../entity/post-likes.entity';
import { PostEntity } from 'src/infrastructure/post/entity/post.entity';
import { PostLikesMapper } from '../adapter/mapper/post-mapper';
import { PgPostLikesRepository } from '../adapter/repository/pg-post-likes-repository';
import { postRepositoryProvider } from 'src/infrastructure/post/provider/repository/post-repository.provider';
import { CountLikesHandler } from 'src/application/post-likes/query/count-likes.handler';
import { ToggleLikesHandler } from 'src/application/post-likes/command/toggle-likes.handler';
import { TooggleLikeService } from 'src/domain/post-likes/service/toggle-likes-service';
import { toggleLikesProvider } from './service/toggle-likes-service.provider';
import { countLikesProvider } from './service/count-likes-service.provider';
import { CountLikesService } from 'src/domain/post-likes/service/count-likes-service';
import { postLikesRepositoryProvider } from './repository/post-likes-repository.provider';
import { PostMapper } from 'src/infrastructure/post/adapter/mapper/post-mapper';
import { PgPostRepository } from 'src/infrastructure/post/adapter/repository/pg-post-repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeEntity, PostEntity]), ],
  providers: [
    PostLikesMapper, 
    PostMapper,
    // Repositorio Likes
    {
      provide: 'PostLikesRepository',
      useClass: PgPostLikesRepository,
    },
    {
      provide: 'PostRepository',
      useClass: PgPostRepository,
    },
    // Repositorio Post (asumiendo que ya lo tienes)
    postRepositoryProvider,
    postLikesRepositoryProvider,
    // Handlers
    CountLikesHandler,
    ToggleLikesHandler,

    // Providers de servicios (usa tokens string)
    {
      provide: TooggleLikeService,
      inject: ['PostLikesRepository', 'PostRepository'],
      useFactory: toggleLikesProvider, // o countLikesProvider, pero SOLO UNO
    },
    {
      provide: CountLikesService,
      inject: ['PostLikesRepository', 'PostRepository'],
      useFactory: countLikesProvider,
    },
  ],
  exports: [
    'PostLikesRepository',
    TooggleLikeService,
    CountLikesService,
    CountLikesHandler,
    ToggleLikesHandler,
  ],
})
export class PostLikesProviderModule {}
