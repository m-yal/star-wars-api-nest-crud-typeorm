import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@ApiTags("Auth paths")
@Controller("auth")
export class AuthController {

  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  @ApiBody({})
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return { msg: "Logged in!" };
  }

  @Get('logout')
  async logout(@Request() req): Promise<any> {
    await req.session.destroy();
    return { msg: "Logged out" };
  }

  @Post('register')
  @ApiBody({})
  async addUser(@Body('password') password: string, @Body('username') userName: string, @Request() req) {
    await req.session.destroy();
    const result = await this.usersService.insertOne(userName, password);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
      roles: result.roles
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return "Hello!";
  }
}