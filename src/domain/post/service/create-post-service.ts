import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../../infrastructure/post/entity/post.entity';
import { UserEntity } from '../../../infrastructure/user/entity/user.entity';
import { PostType } from '../model/post-type';
import { CreatePostCommand } from 'src/application/post/command/create-post.command';
import { PostRepository } from '../port/repository/post-repository';
import { UserRepository } from '../../../domain/user/port/repository/user-repository';
import { Post } from '../model/post';

@Injectable()
export class CreatePostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly postsRepo: PostRepository,
    @InjectRepository(UserEntity) private readonly usersRepo: UserRepository,
  ) {}

  async run(authorId: number, post: CreatePostCommand) {
    const author = await this.usersRepo.findUser(authorId);
    if (!author) throw new BadRequestException('Author not found');

    if (post.type === PostType.TEXT && !post.textContent?.trim()) {
      throw new BadRequestException('textContent is required for text posts');
    }
    if (post.type === PostType.IMAGE && !post.source?.trim()) {
      throw new BadRequestException('Source is required for image posts');
    }
    const postToCreate: Post = {
      author,
      type: post.type,
      textContent: post.type === PostType.TEXT
                  ? post.textContent?.trim() ?? null
                  : null,
      source: post.type === PostType.IMAGE
                ? post.source?.trim() ?? null
                : null,
    }
    const postCreated = await this.postsRepo.create(postToCreate);

    return postCreated;
  }
}
