import { PostRepository } from '../../../../domain/post/port/repository/post-repository';
import { PgPostRepository } from '../../adapter/repository/pg-post-repository';

export const postRepositoryProvider = {
  provide: PostRepository,
  useClass: PgPostRepository,
};
