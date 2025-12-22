import { GetUserByIdService } from "../../../../domain/user/service/get-user-by-id-service";
import { UserRepository } from "../../../../domain/user/port/repository/user-repository";

export function getUserByIdServiceProvider(userRepository: UserRepository) {
  return new GetUserByIdService(userRepository);
}
