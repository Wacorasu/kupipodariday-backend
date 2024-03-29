import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './authorization.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/user-create.dto';
import { AuthJwtDto } from './dto/authorization.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req): AuthJwtDto {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<AuthJwtDto> {
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }
}
