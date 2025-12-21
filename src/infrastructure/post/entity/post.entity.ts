import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../../infrastructure/user/entity/user.entity';
import { CommentEntity } from '../../../infrastructure/comments/entity/comments.entity';
import { PostLikeEntity } from '../../../infrastructure/post-likes/entity/post-likes.entity';
import { PostType } from '../../../domain/post/model/post-type';

@Entity('posts')
@Index('idx_posts_user_id', ['author'])
@Index('idx_posts_created_at', ['createdAt'])
@Index('idx_posts_type', ['type'])
export class PostEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @ManyToOne(() => UserEntity, (u) => u.posts, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  // Para posts tipo texto (y opcionalmente caption si quisieras)
  @Column({ name: 'text_content', type: 'text', nullable: true })
  textContent: string | null;

  // Para posts tipo imagen
  @Column({ type: 'text', nullable: true })
  source: string | null;

  // Solo para posts tipo imagen
  @Column({ type: 'text', nullable: true })
  caption: string | null;

  @OneToMany(() => CommentEntity, (c) => c.post, { cascade: false })
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (l) => l.post, { cascade: false })
  likes: PostLikeEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: "updated_at" })
  updatedAt: Date;
}
