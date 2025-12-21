import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { GetAllPostService } from '../../../domain/post/service/get-all-post-service';

@Injectable()
export class GetAllPostHandler {
  constructor(private _getAllPostService: GetAllPostService) {}

  async run(): Promise<PostDto[]> {
    return await this._getAllPostService.run();
  }
}
