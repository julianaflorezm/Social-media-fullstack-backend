import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ADMIN' })
  name: string;

  @ApiProperty({ type: Date, example: new Date() })
  created?: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updated?: Date;
}
