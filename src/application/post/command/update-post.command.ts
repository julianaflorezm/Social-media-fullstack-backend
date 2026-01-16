import { IsEnum, IsInt, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";
import { PostType } from "../../../domain/post/model/post-type";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdatePostCommand {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({ example: 1, required: false })
  id?: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({ example: 1 })
  authorId: number;

  @IsEnum(PostType)
  @ApiProperty({ example: PostType.IMAGE })
  type: PostType;

  // Si es TEXT, esto es requerido
  @ValidateIf((o) => o.type === PostType.TEXT)
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Yei' })
  textContent: string | null;

  // Si es IMAGE, esto es requerido
  @ValidateIf((o) => o.type === PostType.IMAGE)
  @ApiProperty({ example: '//%&e' })
  source: string | null;

  // Si no aplica, puede omitirse (Swagger lo agradecerá)
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Mi caption' })
  caption?: string;
}