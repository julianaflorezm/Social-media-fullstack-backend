import { ValueRequiredError } from '../../errors/value-required-error';
import { UserDto } from '../../../application/user/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../errors/bussiness-error';
import {
  EMAIL_IS_REQUIRED,
  USER_ID_REQUIRED,
  USER_NOT_FOUND,
} from '../../errors/common-messages';

export class GetUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(email: string): Promise<UserDto> {
    if (!email) {
      throw new BussinessError(EMAIL_IS_REQUIRED, HttpStatus.BAD_REQUEST);
    }
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new ValueRequiredError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
