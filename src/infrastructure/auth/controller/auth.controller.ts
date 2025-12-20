import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UserLoginCommand } from '../../../application/auth/command/user-login.command';
import { ApiOperation } from '@nestjs/swagger';
import { LoginUserHandler } from '../../../application/auth/command/login-user.handler'

@Controller('auth')
export class AuthController {
  constructor(private loginUserHandler: LoginUserHandler) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  signIn(@Body() signInDto: UserLoginCommand) {
    return this.loginUserHandler.run(signInDto);
  }
}