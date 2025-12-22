import { PostLikesRepository } from "src/domain/post-likes/port/repository/post-likes-repository";
import { PostRepository } from "src/domain/post/port/repository/post-repository";
import { CountLikesService } from "src/domain/post-likes/service/count-likes-service";

export function countLikesProvider(postLikesRepository: PostLikesRepository, postRepository: PostRepository) {
  return new CountLikesService(postLikesRepository);
}
