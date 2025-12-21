import { Module } from '@nestjs/common';
import { PostProviderModule } from './provider/post-provider.module';
import { PostController } from './controller/post.controller';

@Module({
  imports: [PostProviderModule],
  controllers: [PostController],
})
export class PostModule {}
