import { RoleRepository } from '../../../../domain/role/port/repository/role-repository';
import { PgRoleRepository } from '../../adapter/repository/pg-role-repository';

export const roleRepositoryProvider = {
  provide: RoleRepository,
  useClass: PgRoleRepository,
};
