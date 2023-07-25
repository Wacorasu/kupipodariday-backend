import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { SECRET_KEY_TOKEN } from 'src/utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: SECRET_KEY_TOKEN,
    });
  }

  async validate(jwtPayload: number) {
    const user = await this.usersService.findById(jwtPayload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
