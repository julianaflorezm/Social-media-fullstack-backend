
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { LoginUserService } from 'src/domain/auth/service/login-user-service';
import { UserRepository } from '../../domain/user/port/repository/user-repository';
import { loginUserServiceProvider } from './provider/service/auth-service.provider';
import { UserProviderModule } from '../user/provider/user-provider.module';
import { LoginUserHandler } from 'src/application/auth/command/login-user.handler';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UserProviderModule,
    PassportModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    JwtStrategy,
    LoginUserHandler,
    {
      provide: LoginUserService,
      inject: [UserRepository, JwtService],
      useFactory: loginUserServiceProvider,
    },
  ],
  controllers: [AuthController],
  exports: [LoginUserService, PassportModule, JwtModule],
})
export class AuthModule {}
