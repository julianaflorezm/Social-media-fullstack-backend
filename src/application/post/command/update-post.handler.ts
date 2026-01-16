import { Injectable } from '@nestjs/common';
import { CreatePostCommand } from './create-post.command';
import { CreatePostsService } from '../../../domain/post/service/create-post-service';
import { PostDto } from '../dto/post.dto';
import { UpdatePostsService } from 'src/domain/post/service/update-post-service';

@Injectable()
export class UpdatePostHandler {
  constructor(private _updatePostService: UpdatePostsService) {}

  async run(post: CreatePostCommand): Promise<PostDto> {    
    return await this._updatePostService.run(post.authorId, post);
  }
}
