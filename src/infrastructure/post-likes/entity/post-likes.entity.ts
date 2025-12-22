import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure/user/entity/user.entity';
import { PostEntity } from '../../../infrastructure/post/entity/post.entity';

@Entity('post_likes')
@Unique('uq_post_like_post_user', ['post', 'user'])
@Index('idx_post_likes_user_id', ['user'])
export class PostLikeEntity {
  @PrimaryColumn({ name: 'post_id' })
  postId: string;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;
  
  @ManyToOne(() => PostEntity, (p) => p.likes, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (u) => u.postLikes, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id'})
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamptz', name: "created_at" })
  createdAt: Date;
}
