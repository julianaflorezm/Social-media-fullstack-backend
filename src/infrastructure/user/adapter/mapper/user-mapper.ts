import { UserDto } from '../../../../application/user/dto/user.dto';
import { UserEntity } from '../../entity/user.entity';

export class UserMapper {
  entityToDomain(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      phone: userEntity.phone,
      role: userEntity.role,
      password: userEntity.password,
      created: userEntity?.created,
      updated: userEntity?.updated,
    };
  }

  /*async entityToDomain(userDomain: User): Promise<UserEntity> {
    return {
      name: userDomain.name,
      email: userDomain.email,
      phone: userDomain.phone,
    };
  }*/
}
