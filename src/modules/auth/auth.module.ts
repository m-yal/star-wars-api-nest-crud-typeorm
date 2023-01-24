import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SessionSerializer } from './session/session.serializer';
import { LocalStrategy } from './config/strategy/local.strategy';
import { UsersMysqlRepository } from './users.mysql.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
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