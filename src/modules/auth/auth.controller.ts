import { Controller, Get, Post, UseGuards, Request, Body, Inject } from '@nestjs/common';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { LocalAuthGuard } from './config/guards/local.auth.guard';
import { ExecutedDto } from '../crud/config/dto/executed.dto';
import { IAuthController } from './config/interfaces/auth.interface';
import { NewUserDto } from './config/dto/new-user.dto';

@ApiTags("Auth paths")
@Controller("auth")
export class AuthController implements IAuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  @ApiBody({})
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<ExecutedDto> {
    return { executed: true };
  }

  @Get('logout')
  async logout(@Request() req): Promise<ExecutedDto> {
    await req.session.destroy();
    return { executed: true };
  }

  @Post('register')
  @ApiBody({})
  async addUser(@Body('password') password: string, @Body('username') userName: string, @Request() req): Promise<NewUserDto> {
    await req.session.destroy();
    const result = await this.usersService.insertOne(userName, password);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
      roles: result.roles
    };
  }
}