import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserLoginCommand } from '../../../application/auth/command/user-login.command';

export class CreateUserCommand extends PartialType(UserLoginCommand) {
  @ApiProperty({ example: 'Ana' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'pinzon' })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'Ani' })
  @IsNotEmpty()
  alias: string;

  @ApiProperty({ example: new Date('15/05/1999') })
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
