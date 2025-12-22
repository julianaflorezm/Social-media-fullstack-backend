import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Roles } from '../../role/decorator/role.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountLikesHandler } from 'src/application/post-likes/query/count-likes.handler';
import { ToggleLikesHandler } from 'src/application/post-likes/command/toggle-likes.handler';
import { ToggleLikesCommand } from 'src/application/post-likes/command/toggle-likes.command';

@ApiBearerAuth()
@ApiTags('post-likes')
@Controller('post-likes')
export class PostLikesController {
  constructor(
    private readonly _countLikesHandler: CountLikesHandler,
    private readonly _toggleLikesHandler: ToggleLikesHandler,
  ) {}

  @Get(':postId')
  @ApiOperation({ summary: 'Count likes by post' })
  @ApiResponse({
    status: 200,
    description: 'Count likes by post persisted on database',
  })
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  async getLikeCount( @Param('postId') postId: string ): Promise<number> {
    return await this._countLikesHandler.run(postId);
  }

  @Post()
  @ApiOperation({ summary: 'Toggle post' })
  @ApiCreatedResponse({
    description: 'Toggle post persisted on database',
  })
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  async create(
    @Body()
    toggleLikes: ToggleLikesCommand,
  ): Promise<{liked: boolean}> {
    return await this._toggleLikesHandler.run(toggleLikes);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update users.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Update user persisted on database',
  //   type: UserDto,
  // })
  // @ApiNotFoundResponse({
  //   description: 'User not found on database or id required',
  // })
  // @ApiNotAcceptableResponse({
  //   description: 'User id must be a number',
  // })
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  // async update(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  //   @Body() user: Partial<CreateUserCommand>,
  // ): Promise<UserDto> {
  //   return await this._updateUserHandler.run(id, user);
  // }
}
