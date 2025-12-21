import { PostRepository } from "../../../../domain/post/port/repository/post-repository";
import { GetAllPostService } from "../../../../domain/post/service/get-all-post-service";

export function getAllPostServiceProvider(
  postRepository: PostRepository,
) {
  return new GetAllPostService(postRepository);
}
