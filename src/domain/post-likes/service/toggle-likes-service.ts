import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "src/domain/post/port/repository/post-repository";
import { PostEntity } from "src/infrastructure/post/entity/post.entity";
import { PostLikesRepository } from "../port/repository/post-likes-repository";

// like.service.ts
@Injectable()
export class TooggleLikeService {
  constructor(
    @Inject('PostLikesRepository')
    private readonly likeRepo: PostLikesRepository,
    @Inject('PostRepository')
    private readonly postRepo: PostRepository,
  ) {}

  async toggleLike(postId: string, userId: number) {    
    const exists = await this.likeRepo.findOne(userId, postId);

    if (exists) {
      await this.likeRepo.delete(userId, postId);
      return { liked: false };
    }

    // (opcional) validar que el post exista
    const post = await this.postRepo.findOne(postId);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    await this.likeRepo.save(userId, postId);
    return { liked: true };
  }
}
