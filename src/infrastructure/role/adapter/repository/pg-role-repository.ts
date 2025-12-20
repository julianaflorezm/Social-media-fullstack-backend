import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../../../domain/role/port/repository/role-repository';
import { RoleEntity } from '../../entity/role.entity';
import { RoleDto } from '../../../../application/role/query/dto/role.dto';

@Injectable()
export class PgRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async findRole(id: number): Promise<RoleDto | null> {
    const role = await this._roleRepository.findOne({
      where: { id },
    });
    return role ?? null;
  }
}
