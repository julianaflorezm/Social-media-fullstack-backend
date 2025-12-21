import { PostEntity } from 'src/infrastructure/post/entity/post.entity';
import { PostDto } from '../../../../application/post/dto/post.dto';

export class PostMapper {
  entityToDomain(postEntity: PostEntity): PostDto {
    return {
      id: postEntity.id,
      authorId: postEntity.author.id,
      type: postEntity.type,
      textContent: postEntity.textContent,
      source: postEntity.source,
      caption: postEntity.caption,
      createdAt: postEntity?.createdAt,
      updatedAt: postEntity?.updatedAt,
      commentCount: postEntity.comments.length,
      likeCount: postEntity.likes.length
    };
  }

  /*async entityToDomain(userDomain: User): Promise<UserEntity> {
    return {
      name: userDomain.name,
      email: userDomain.email,
      phone: userDomain.phone,
    };
  }*/
}
