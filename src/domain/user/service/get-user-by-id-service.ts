import { ValueRequiredError } from '../../errors/value-required-error';
import { UserDto } from '../../../application/user/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../errors/bussiness-error';
import {
  USER_ID_REQUIRED,
  USER_NOT_FOUND,
} from '../../errors/common-messages';

export class GetUserByIdService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number): Promise<UserDto | null> {
    if (!id) {
      throw new BussinessError(USER_ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }
    const user = await this._userRepository.findUser(id);
    if (!user) {
      throw new ValueRequiredError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
