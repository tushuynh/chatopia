import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ERROR_MESSAGE } from '@shared/constants';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { cookies } = request;

    request.headers['authorization'] = `Bearer ${cookies.accessToken}`;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(ERROR_MESSAGE.TOKEN_INVALID);
    }

    return user;
  }
}
