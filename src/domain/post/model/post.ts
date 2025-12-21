import { UserDto } from '../../../application/user/dto/user.dto';
import { PostType } from './post-type';

export class Post {
  id?: string;
  author: UserDto;
  type: PostType;
  textContent: string | null;
  source: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  likeCount?: number;
  commentCount?: number;
}
