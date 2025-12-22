import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "../../../domain/post/model/post-type";
import { IsEnum } from "class-validator";

export class PostLikesDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  postId: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
