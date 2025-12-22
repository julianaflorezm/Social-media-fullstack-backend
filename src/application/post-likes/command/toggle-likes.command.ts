import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ToggleLikesCommand {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  postId: string;
}
