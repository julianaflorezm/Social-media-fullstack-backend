import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "../../../domain/post/model/post-type";
import { IsEnum } from "class-validator";

export class PostDto {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 1 })
  authorId: number;

  @IsEnum(PostType)
  @ApiProperty({ example: PostType.IMAGE})
  type: PostType;
    
  @ApiProperty({ example: 'Yei' })
  textContent: string | null;

  @ApiProperty({ example: '/%E4' })
  source: string | null;
  
  @ApiProperty({ example: 'Vida linda' })
  caption: string | null;

  @ApiProperty({ type: Date, example: new Date() })
  createdAt: Date;

  @ApiProperty({ type: Date, example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: 1 })
  likeCount: number;

  @ApiProperty({ example: 1 })
  commentCount: number;
}
