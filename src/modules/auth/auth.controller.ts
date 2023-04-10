import { Controller, Get, Post, Request, Body, Inject } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { IAuthController } from './interfaces/auth.controller.interfaces';
import { CredentialsDto } from './dto/auth.dto';
import { IUsersService } from './interfaces/users.service.interface';
import { LoginDecorators, LogoutDecorators, RegisterDecorators } from './decorators/auth.controller.decorators';
import { Users } from './entities/users.entity';
import { AuthInjectionToken } from './injection.tokens';

@ApiTags("Auth paths")
@Controller("auth")
export class AuthController implements IAuthController {
  constructor(@Inject(AuthInjectionToken.USERS_SERVICE) private readonly usersService: IUsersService) { }

  @Post('login')
  @LoginDecorators()
  async login(@Request() req): Promise<true> {
    return true;
  }

  @Get('logout')
  @LogoutDecorators()
  async logout(@Request() req): Promise<true> {
    await req.session.destroy();
    return true;
  }

  @Post('register')
  @RegisterDecorators()
  async addUser(@Body() body: CredentialsDto, @Request() req): Promise<Users> {
    await req.session.destroy();
    return await this.usersService.insertOneUser(body);
  }
}