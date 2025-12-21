import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../../infrastructure/post/entity/post.entity';
import { PostRepository } from '../port/repository/post-repository';
import { PostDto } from 'src/application/post/dto/post.dto';

@Injectable()
export class GetAllPostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postsRepo: PostRepository,
  ) {}

  async run(): Promise<PostDto[]> { 
    return await this.postsRepo.getAll();
  }
}
