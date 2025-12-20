import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../application/user/dto/user.dto';
import { UserLoginCommand } from './user-login.command';
import { LoginUserService } from '../../../domain/auth/service/login-user-service';

@Injectable()
export class LoginUserHandler {
  constructor(private _loginUserService: LoginUserService) {}

  async run(user: UserLoginCommand): Promise<UserDto> {
    return await this._loginUserService.run(user);
  }
}
