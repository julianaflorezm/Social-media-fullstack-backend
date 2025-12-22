import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostRepository } from "src/domain/post/port/repository/post-repository";
import { PostEntity } from "src/infrastructure/post/entity/post.entity";
import { PostLikesRepository } from "../port/repository/post-likes-repository";

// like.service.ts
@Injectable()
export class CountLikesService {
  constructor(
    @Inject('PostLikesRepository')
    private readonly likeRepo: PostLikesRepository,
  ) {}

  async count(postId: string): Promise<number> {
    return this.likeRepo.count(postId);
  }
}
