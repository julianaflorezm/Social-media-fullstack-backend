import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../../domain/user/port/repository/user-repository';
import { UserEntity } from '../../entity/user.entity';
import { UserDto } from '../../../../application/user/dto/user.dto';
import { User } from '../../../../domain/user/model/user';
import { RoleEntity } from '../../../../infrastructure/role/entity/role.entity';
import e from 'express';

@Injectable()
export class PgUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this._userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    return user ?? null;;
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserDto> {
    return await this._userRepository.save({ id, ...user });
  }

  async create(user: User): Promise<UserDto> {
    const entity = new UserEntity();
    entity.name = user.name;
    entity.lastname = user.lastname;
    entity.alias = user.alias;
    entity.email = user.email;
    entity.password = user.password;

    if (user.role) {
      const role = new RoleEntity();
      role.id = user.role.id;
      role.name = user.role.name;
      role.created = user.role.created;
      role.updated = user.role.updated;
      entity.role = role;
    }
    return await this._userRepository.save(entity);
  }

  async deleteUser(id: number): Promise<boolean> {
    return (await this._userRepository.delete(id)).affected === 1;
  }

  async findUser(id: number): Promise<UserDto | null> {
    const user = await this._userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
    return user ?? null;;
  }

  async findAll(): Promise<UserDto[]> {
    return await this._userRepository.find({
      relations: {
        role: true,
      },
    });
  }
}
