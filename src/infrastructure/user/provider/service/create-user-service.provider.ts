import { RoleRepository } from "../../../../domain/role/port/repository/role-repository";
import { UserRepository } from "../../../../domain/user/port/repository/user-repository";
import { CreateUserService } from "../../../../domain/user/service/create-user-service";

export function createUserServiceProvider(
  userRepository: UserRepository,
  roleRepository: RoleRepository,
) {
  return new CreateUserService(userRepository, roleRepository);
}
