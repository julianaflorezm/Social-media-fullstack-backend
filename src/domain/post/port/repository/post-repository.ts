import { PostDto } from '../../../../application/post/dto/post.dto';
import { Post } from '../../model/post';

export abstract class PostRepository {
  abstract create(post: Post): Promise<PostDto>;
  abstract getAll(): Promise<PostDto[]>
  abstract findOne(postId: string): Promise<PostDto  | null>;
  abstract update(post: Post): Promise<PostDto>;
}
