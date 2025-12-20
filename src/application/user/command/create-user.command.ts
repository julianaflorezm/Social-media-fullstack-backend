import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserLoginCommand } from '../../../application/auth/command/user-login.command';

export class CreateUserCommand extends PartialType(UserLoginCommand) {
  @ApiProperty({ example: 'Ana' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '3241234456' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
