import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { Roles } from '../../role/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/application/user/dto/user.dto';
import { GetUserHandler } from 'src/application/user/query/get-user.handler';
import { CreateUserHandler } from 'src/application/user/command/create-user.handler';
import { CreateUserCommand } from 'src/application/user/command/create-user.command';
import { CreatePostHandler } from 'src/application/post/command/create-post.handler';
import { PostDto } from 'src/application/post/dto/post.dto';
import { CreatePostCommand } from 'src/application/post/command/create-post.command';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { PostType } from 'src/domain/post/model/post-type';
import { GetAllPostHandler } from 'src/application/post/query/get-all-post.hadler';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly _getAllPostHandler: GetAllPostHandler,
    private readonly _createPostHandler: CreatePostHandler,
  ) {}

  @Get('all')
  @ApiOperation({ summary: 'Find all posts' })
  @ApiResponse({
    status: 200,
    description: 'Find all posts persisted on database',
    type: PostDto,
  })
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  async getAll(): Promise<PostDto[]> {
    return await this._getAllPostHandler.run();
  }

  // @Get(':email')
  // @ApiOperation({ summary: 'Find user by email' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Find user by email persisted on database',
  //   type: UserDto,
  // })
  // @ApiNotFoundResponse({
  //   description: 'User not found on database or email required',
  // })
  // @ApiNotAcceptableResponse({
  //   description: 'User email must be an string',
  // })
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  // async findOneByEmail(
  //   @Param(
  //     'email'
  //   )
  //   email: string,
  // ): Promise<UserDto> {
  //   return await this._getUserHandler.run(email);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Delete user by id identifier' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Delete user by id persisted on database',
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
  // @Roles('ADMIN', 'EMPLOYEE')
  // async deleteOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ): Promise<UserDto> {
  //   return await this._deleteUserHandler.run(id);
  // }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiCreatedResponse({
    description: 'Post persisted on database',
    type: PostDto,
  })
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        source: { type: 'string', format: 'binary' },
        authorId: { type: 'number', example: 1 },
        type: { type: 'string', enum: [PostType.IMAGE, PostType.TEXT], example: PostType.IMAGE },
        textContent: { type: 'string', nullable: true, example: 'Hola' },
        caption: { type: 'string', nullable: true, example: 'Mi caption' },
      },
      required: ['authorId', 'type'],
    },
  })
  @UseInterceptors(
    FileInterceptor('source', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, source, cb) => {
          const ext = extname(source.originalname); // .png .jpg etc
          const filename = `${randomUUID()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (_req, source, cb) => {
        // Solo imágenes
        if (!source.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async create(
    @UploadedFile() source: Express.Multer.File,
    @Body()
    post: CreatePostCommand,
  ): Promise<PostDto> {
    if (!source && post.type === PostType.IMAGE) {
      throw new BadRequestException('Image file is required');
    } 
    if (source && post.type === PostType.IMAGE) { 
      const imageUrl = `${process.env.BASE_URL}uploads/${source.filename}`;
      post.source = imageUrl;
    }
    return await this._createPostHandler.run(post);
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

  // @Post('login')
  // @ApiOperation({ summary: 'User login' })
  // async login(
  //   @Body()
  //   user: UserLoginCommand,
  // ): Promise<UserDto> {
  //   return await this._loginUserHandler.run(user);
  // }
}
