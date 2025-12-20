import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class UserLoginCommand {
  @ApiProperty({ example: 'ana@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '!564pass' })
  @MinLength(4)
  @MaxLength(12)
  password: string;
}
