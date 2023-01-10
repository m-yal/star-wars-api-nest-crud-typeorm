import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './config/entities/user.entity';
import { SessionSerializer } from './config/session/session.serializer';
import { LocalStrategy } from './config/strategy/local.strategy';
import { UsersMysqlRepository } from './users.mysql.repository';
import { UsersService } from './users.service';

@Module({
  imports: [PassportModule.register({ session: true }), TypeOrmModule.forFeature([User]),],
  providers: [AuthService, LocalStrategy, SessionSerializer, UsersService, UsersMysqlRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }