import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../../../application/role/query/dto/role.dto';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ana' })
  name: string;

  @ApiProperty({ example: 'Pinzon' })
  lastname: string;

  @ApiProperty({ example: 'Ani' })
  alias: string;

  @ApiProperty({ example: 'ana@gmail.com' })
  email: string;

  @ApiProperty({ example: new Date('13-05-1999')})
  birthdate: Date;

  @ApiProperty({
    example: { id: 1, name: 'ADMIN', created: new Date(), updated: new Date() },
  })
  role: RoleDto;

  @ApiProperty({ example: '3241234456' })
  password: string;

  @ApiProperty({ type: Date, example: new Date() })
  created?: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updated?: Date;

  @ApiProperty({ example: '3241234456' })
  token?: string;
}
