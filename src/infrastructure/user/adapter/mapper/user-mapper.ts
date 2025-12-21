import { UserDto } from '../../../../application/user/dto/user.dto';
import { UserEntity } from '../../entity/user.entity';

export class UserMapper {
  entityToDomain(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      lastname: userEntity.lastname,
      alias: userEntity.alias,
      email: userEntity.email,
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
