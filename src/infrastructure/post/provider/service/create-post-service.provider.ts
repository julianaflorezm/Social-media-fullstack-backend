import { PostRepository } from "src/domain/post/port/repository/post-repository";
import { UserRepository } from "../../../../domain/user/port/repository/user-repository";
import { CreatePostsService } from "src/domain/post/service/create-post-service";

export function createPostServiceProvider(
  postRepository: PostRepository,
  userRepository: UserRepository
) {
  return new CreatePostsService(postRepository, userRepository);
}
