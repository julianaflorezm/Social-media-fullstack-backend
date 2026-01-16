import { PostRepository } from "src/domain/post/port/repository/post-repository";
import { UserRepository } from "../../../../domain/user/port/repository/user-repository";
import { UpdatePostsService } from "../../../../domain/post/service/update-post-service";

export function updatePostServiceProvider(
  postRepository: PostRepository,
  userRepository: UserRepository
) {
  return new UpdatePostsService(postRepository, userRepository);
}
