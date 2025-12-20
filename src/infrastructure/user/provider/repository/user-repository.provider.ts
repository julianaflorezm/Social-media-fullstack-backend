import { UserRepository } from '../../../../domain/user/port/repository/user-repository';
import { PgUserRepository } from '../../adapter/repository/pg-user-repository';

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: PgUserRepository,
};
