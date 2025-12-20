import { UserDto } from 'src/application/user/dto/user.dto';
import { User } from '../../model/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserDto | null>;
  abstract create(user: User): Promise<UserDto>;
}
