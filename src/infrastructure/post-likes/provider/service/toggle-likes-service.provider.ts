import { PostLikesRepository } from "../../../../domain/post-likes/port/repository/post-likes-repository";
import { PostRepository } from "../../../../domain/post/port/repository/post-repository";
import { TooggleLikeService } from "../../../../domain/post-likes/service/toggle-likes-service";

export function toggleLikesProvider(postLikesRepository: PostLikesRepository, postRepository: PostRepository) {
  return new TooggleLikeService(postLikesRepository, postRepository);
}