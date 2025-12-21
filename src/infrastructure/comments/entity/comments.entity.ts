import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure/user/entity/user.entity';
import { PostEntity } from '../../../infrastructure/post/entity/post.entity';

@Entity('comments')
@Index('idx_comments_post_id', ['post'])
@Index('idx_comments_created_at', ['createdAt'])
export class CommentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @ManyToOne(() => PostEntity, (p) => p.comments, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'post_id'})
  post: PostEntity;

  @ManyToOne(() => UserEntity, (u) => u.comments, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id'})
  author: UserEntity;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamptz', name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: "created_at" })
  updatedAt: Date;
}
