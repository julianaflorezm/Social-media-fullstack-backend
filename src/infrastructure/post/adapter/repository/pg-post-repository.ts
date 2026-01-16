import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import e from 'express';
import { PostRepository } from '../../../../domain/post/port/repository/post-repository';
import { PostEntity } from '../../../../infrastructure/post/entity/post.entity';
import { Post } from '../../../../domain/post/model/post';
import { PostDto } from '../../../../application/post/dto/post.dto';
import { PostMapper } from '../mapper/post-mapper';
import { UserEntity } from '../../../../infrastructure/user/entity/user.entity';

@Injectable()
export class PgPostRepository implements PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
    private readonly _postMapper: PostMapper,
  ) {}
  async update(post: Post): Promise<PostDto> {
    const entity = await this._postRepository.findOne({
      where: { id: post.id },
      relations: {
        author: true,
        comments: true,
        likes: true,
      },
    });

    if (!entity) {
      throw new Error('Post not found');
    }

    // Actualizar solo lo necesario
    entity.textContent = post.textContent ?? entity.textContent;
    // entity.caption = post.caption ?? entity.caption;
    // entity.source = post.source ?? entity.source;
    // entity.type = post.type ?? entity.type;
    entity.updatedAt = new Date();
    const updated = await this._postRepository.save(entity);

    return this._postMapper.entityToDomain(updated);
  }

  async create(post: Post): Promise<PostDto> {
    const entity = new PostEntity();
    entity.type = post.type;
    entity.textContent = post.textContent;
    entity.source = post.source;
    entity.caption = post.caption;
    entity.comments = [];
    entity.likes = [];

    if (post.author) {
      const user = new UserEntity();
      user.id = post.author.id;
      user.name = post.author.name;
      user.lastname = post.author.lastname;
      user.alias = post.author.alias;
      entity.author = user;
    }
    const postEntity = await this._postRepository.save(entity);
    return this._postMapper.entityToDomain(postEntity);
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

  // async deleteUser(id: number): Promise<boolean> {
  //   return (await this._userRepository.delete(id)).affected === 1;
  // }

  async findOne(id: string): Promise<PostDto | null> {
    const post = await this._postRepository.findOne({
      where: { id },
      relations: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    return post ? this._postMapper.entityToDomain(post) : null;
  }

  async getAll(): Promise<PostDto[]> {
    const postsEntity = await this._postRepository.find({
      relations: { author: true, comments: true, likes: true },
      order: { createdAt: 'DESC' },
    });
    return postsEntity.map((p) => this._postMapper.entityToDomain(p));
  }
}
