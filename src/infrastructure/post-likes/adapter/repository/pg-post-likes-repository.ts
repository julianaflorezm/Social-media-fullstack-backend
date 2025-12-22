import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PostLikesMapper } from '../mapper/post-mapper';
import { PostLikesRepository } from 'src/domain/post-likes/port/repository/post-likes-repository';
import { PostLikeEntity } from '../../entity/post-likes.entity';
import { PostLikesDto } from 'src/application/post-likes/dto/post-likes.dto';

@Injectable()
export class PgPostLikesRepository implements PostLikesRepository {
  constructor(
    @InjectRepository(PostLikeEntity)    
    private readonly _postLikesRepository: Repository<PostLikeEntity>,
    private readonly _postLikesMapper: PostLikesMapper,
  ) {}

  async create(userId: number, postId: string): Promise<PostLikesDto> {
    const entity = new PostLikeEntity();
    entity.userId = userId;
    entity.postId = postId;
    const postEntity = await this._postLikesRepository.create(entity);
    return this._postLikesMapper.entityToDomain(postEntity);
  }

  async save(userId: number, postId: string): Promise<PostLikesDto> {
    const entity = new PostLikeEntity();
    entity.userId = userId;
    entity.postId = postId;
    const postEntity = await this._postLikesRepository.save(entity);
    return this._postLikesMapper.entityToDomain(postEntity);
  }
  // async findByEmail(email: string): Promise<UserDto | null> {
  //   const user = await this._postRepository.findOne({
  //     where: { email },
  //     relations: {
  //       role: true,
  //     },
  //   });
  //   return user ?? null;;
  // }

  // async update(id: number, user: Partial<UserEntity>): Promise<UserDto> {
  //   return await this._userRepository.save({ id, ...user });
  // }

 

  async delete(userId: number, postId: string): Promise<void> {
    await this._postLikesRepository.delete({
      userId, postId
    });
  }

  async findOne(userId: number, postId: string): Promise<PostLikesDto | null> {
    const post = await this._postLikesRepository.findOne({
      where: { userId, postId }
    });
    return post ? this._postLikesMapper.entityToDomain(post) : null;
  }

  async count(postId: string): Promise<number> {
    const post = await this._postLikesRepository.count({
      where: { postId }
    });
    return post;
  }
  // async getAll(): Promise<PostDto[]> {
  //   const postsEntity = await this._postRepository.find({
  //     relations: { author: true, comments: true, likes: true },
  //     order: { createdAt: 'DESC' },
  //   });
  //   return postsEntity.map((p) => this._postMapper.entityToDomain(p))
  // }
}
