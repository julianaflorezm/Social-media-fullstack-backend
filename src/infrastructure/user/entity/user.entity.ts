import { PostEntity } from '../../../infrastructure/post/entity/post.entity';
import { RoleEntity } from '../../role/entity/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from '../../../infrastructure/comments/entity/comments.entity';
import { PostLikeEntity } from '../../../infrastructure/post-likes/entity/post-likes.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  lastname: string;

  @Column()
  alias: string;

  @Column()
  password: string;

  @Column()
  email: string;
  
  @Column()
  birthdate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(() => PostEntity, (post) => post.author)
  @JoinColumn({ name: 'post_id' })
  posts: PostEntity[]

  @OneToMany(() => CommentEntity, (c) => c.author)
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (l) => l.user)
  postLikes: PostLikeEntity[];
}
