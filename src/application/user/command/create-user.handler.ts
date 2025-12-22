import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { CreateUserService } from '../../../domain/user/service/create-user-service';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../domain/user/model/user';

@Injectable()
export class CreateUserHandler {
  constructor(private _createUserService: CreateUserService) {}

  async run(user: CreateUserCommand): Promise<UserDto> {
    
    if (!user.password) {
      throw new Error('Password is required');
    }
    if (!user.email) {
      throw new Error('Email is required');
    }
    return await this._createUserService.run(
      await User.create(user.name, user.lastname, user.alias, user.password, user.email, user.birthdate),
      user.roleId,
    );
  }
}
