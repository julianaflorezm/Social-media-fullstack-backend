import { Injectable } from '@nestjs/common';
import { CreatePostCommand } from './create-post.command';
import { CreatePostsService } from '../../../domain/post/service/create-post-service';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class CreatePostHandler {
  constructor(private _createPostService: CreatePostsService) {}

  async run(post: CreatePostCommand): Promise<PostDto> {    
    return await this._createPostService.run(post.authorId, post);
  }
}
