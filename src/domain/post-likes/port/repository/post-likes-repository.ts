import { PostLikesDto } from '../../../../application/post-likes/dto/post-likes.dto';

export abstract class PostLikesRepository {
  abstract findOne(userId: number, postId: string): Promise<PostLikesDto | null>
  abstract delete(userId: number, postId: string): Promise<void>;
  abstract save(userId: number, postId: string): Promise<PostLikesDto>;
  abstract create(userId: number, postId: string): Promise<PostLikesDto>;
  abstract count(postId: string): Promise<number>;
}
