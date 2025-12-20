import { RoleRepository } from '../../../domain/role/port/repository/role-repository';
import { User } from '../model/user';
import { UserDto } from '../../../application/user/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { Role } from '../../../domain/role/model/role';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../../domain/errors/bussiness-error';
import { EMAIL_ALREADY_EXISTS, ROLE_NOT_EXISTS } from '../../../domain/errors/common-messages';

export class CreateUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _roleRepository: RoleRepository,
  ) {}

  async run(user: User, roleId: number): Promise<UserDto> {
    const usr = await this._userRepository.findByEmail(user.email);
    if (usr) {
      throw new BussinessError(EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const rolee = await this._roleRepository.findRole(
      roleId,
    );
    if(!rolee) {
      throw new BussinessError(ROLE_NOT_EXISTS, HttpStatus.BAD_REQUEST)
    }
    const role = new Role(rolee.id, rolee.name, rolee.created ?? new Date(), rolee.updated ?? new Date());
    user.role = role;
    return await this._userRepository.create(user);
  }
}
