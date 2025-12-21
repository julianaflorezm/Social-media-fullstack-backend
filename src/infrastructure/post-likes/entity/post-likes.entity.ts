import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure/user/entity/user.entity';
import { PostEntity } from '../../../infrastructure/post/entity/post.entity';

@Entity('post_likes')
@Unique('uq_post_like_post_user', ['post', 'user'])
@Index('idx_post_likes_user_id', ['user'])
export class PostLikeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @ManyToOne(() => PostEntity, (p) => p.likes, { onDelete: 'CASCADE', nullable: false })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (u) => u.postLikes, { onDelete: 'CASCADE', nullable: false })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
