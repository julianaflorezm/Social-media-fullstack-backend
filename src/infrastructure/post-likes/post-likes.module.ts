import { Module } from '@nestjs/common';
import { PostLikesProviderModule } from './provider/post-likes-provider.module';
import { PostLikesController } from './controller/post-likes.controller';

@Module({
  imports: [PostLikesProviderModule],
  controllers: [PostLikesController],
})
export class PostLikesModule {}