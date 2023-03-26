import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users } from './entities/users.entity';
import { SessionSerializer } from './session/session.serializer';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersMysqlRepository } from './users.mysql.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: "IUsersService",
      useClass: UsersService
    },
    {
      provide: "IUsersMysqlRepository",
      useClass: UsersMysqlRepository
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }