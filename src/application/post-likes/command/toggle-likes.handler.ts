import { Injectable } from '@nestjs/common';
import { TooggleLikeService } from 'src/domain/post-likes/service/toggle-likes-service';
import { ToggleLikesCommand } from './toggle-likes.command';

@Injectable()
export class ToggleLikesHandler {
  constructor(private _tooggleLikeService: TooggleLikeService) {}

  async run(toggleLikes: ToggleLikesCommand): Promise<{ liked: boolean }> {    
    return await this._tooggleLikeService.toggleLike(
      toggleLikes.postId,
      toggleLikes.userId,
    );
  }
}
