import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/auth.service';
import { SessionSerializer } from 'src/modules/auth/session/session.serializer';
import { LocalStrategy } from 'src/modules/auth/strategy/local.strategy';

@Module({
  imports: [PassportModule.register({session: true})],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}