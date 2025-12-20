import { UserRepository } from "../../../../domain/user/port/repository/user-repository";
import { GetUserService } from "../../../../domain/user/service/get-user-service";

export function getUserServiceProvider(userRepository: UserRepository) {
  return new GetUserService(userRepository);
}
