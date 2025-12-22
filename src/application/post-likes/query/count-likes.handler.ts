import { Injectable } from '@nestjs/common';
import { CountLikesService } from 'src/domain/post-likes/service/count-likes-service';

@Injectable()
export class CountLikesHandler {
  constructor(private _countLikesService: CountLikesService) {}

  async run(postId: string): Promise<number> {
    return await this._countLikesService.count(
      postId,
    );
  }
}
