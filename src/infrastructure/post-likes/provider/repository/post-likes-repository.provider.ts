import { PostLikesRepository } from '../../../../domain/post-likes/port/repository/post-likes-repository';
import { PgPostLikesRepository } from '../../adapter/repository/pg-post-likes-repository';

export const postLikesRepositoryProvider = {
  provide: PostLikesRepository,
  useClass: PgPostLikesRepository,
};
