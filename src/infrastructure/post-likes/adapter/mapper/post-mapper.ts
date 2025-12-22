import { PostLikeEntity } from '../../entity/post-likes.entity';
import { PostLikesDto } from 'src/application/post-likes/dto/post-likes.dto';

export class PostLikesMapper {
  entityToDomain(postLikeEntity: PostLikeEntity): PostLikesDto {
    return {
      postId: postLikeEntity.postId,
      userId: postLikeEntity.userId,
      createdAt: postLikeEntity.createdAt,
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
