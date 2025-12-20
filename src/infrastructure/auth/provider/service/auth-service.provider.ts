import { LoginUserService } from "../../../../domain/auth/service/login-user-service";
import { UserRepository } from "../../../../domain/user/port/repository/user-repository";
import { JwtService } from '@nestjs/jwt';

export function loginUserServiceProvider(userRepository: UserRepository, jwtService: JwtService ) {
  return new LoginUserService(userRepository, jwtService );
}
