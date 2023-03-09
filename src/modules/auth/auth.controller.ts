import { Controller, Get, Post, Request, Body, Inject } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { ExecutedDto } from '../crud/config/dto/executed.dto';
import { IAuthController } from './interfaces/auth.controller.interfaces';
import { NewUserDto } from './dto/new-user.dto';
import { IUsersService } from './interfaces/users.service.interface';
import { LoginDecorators, LogoutDecorators, RegisterDecorators } from './decorators/auth.controller.decorators';
import { Users } from './entities/users.entity';

@ApiTags("Auth paths")
@Controller("auth")
export class AuthController implements IAuthController {
  constructor(@Inject("IUsersService") private readonly usersService: IUsersService) { }

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
  async addUser(@Body('password') password: string, @Body('username') userName: string, @Request() req): Promise<Users> {
    await req.session.destroy();
    return await this.usersService.insertOneUser(userName, password);
  }
}