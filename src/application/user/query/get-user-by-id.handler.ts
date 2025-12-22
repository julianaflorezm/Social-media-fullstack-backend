import { Injectable } from '@nestjs/common';
import { GetUserService } from '../../../domain/user/service/get-user-by-email-service';
import { UserDto } from '../dto/user.dto';
import { GetUserByIdService } from '../../../domain/user/service/get-user-by-id-service';

@Injectable()
export class GetUserByIdHandler {
  constructor(private _getUserByIdService: GetUserByIdService) {}

  async run(id: number): Promise<UserDto | null> {
    return await this._getUserByIdService.run(id);
  }
}
