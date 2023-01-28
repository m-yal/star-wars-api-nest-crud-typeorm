import { Controller, Get, Post, Request, Body, Inject } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { ExecutedDto } from '../crud/config/dto/executed.dto';
import { IAuthController } from './interfaces/auth.controller.interface';
import { NewUserDto } from './dto/new-user.dto';
import { IUsersService } from './interfaces/users.service.interface';
import { LoginDecorators, LogoutDecorators, RegisterDecorators } from './decorators/auth.controller.decorators';
import { Users } from './entities/users.entity';

@ApiTags("Auth paths")
@Controller("auth")
export class AuthController implements IAuthController {
  constructor(@Inject("IUsersService")private readonly usersService: IUsersService) { }

  @Post('login')
  @LoginDecorators()
  async login(@Request() req): Promise<ExecutedDto> {
    return { executed: true };
  }

  @Get('logout')
  @LogoutDecorators()
  async logout(@Request() req): Promise<ExecutedDto> {
    await req.session.destroy();
    return { executed: true };
  }

  @Post('register')
  @RegisterDecorators()
  async addUser(@Body('password') password: string, @Body('username') userName: string, @Request() req): Promise<NewUserDto> {
    await req.session.destroy();
    const result: Users = await this.usersService.insertOneUser(userName, password);
    return {
      msg: 'User successfully registered',
      userName: result.username,
      roles: result.roles
    };
  }
}