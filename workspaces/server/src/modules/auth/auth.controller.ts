import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './responses/login.response';
import { ApiResponseCustom } from '@core/decorators/apiOkResponse.decorator';
import { LoginUserDto } from '@modules/user/dtos/loginUser.dto';
import { User } from '@modules/database/schemas/user.schema';
import { CreateUserDto } from '@modules/user/dtos/createUser.dto';
import { SuccessResponse } from '@common/responses/success.response';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponseCustom(HttpStatus.OK, LoginResponse)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = req.user as User;
    const tokens = await this.authService.login(user);
    const cookieOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    res.cookie('accessToken', tokens.accessToken, cookieOption);
    res.cookie('refreshToken', tokens.refreshToken, cookieOption);

    return { user, tokens };
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponseCustom(HttpStatus.CREATED, LoginResponse)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const response = await this.authService.register(createUserDto);
    const { tokens } = response;
    const cookieOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    res.cookie('accessToken', tokens.accessToken, cookieOption);
    res.cookie('refreshToken', tokens.refreshToken, cookieOption);

    return response;
  }

  @Get('/logout')
  @ApiOperation({ summary: 'Logout user account' })
  @ApiResponseCustom(HttpStatus.OK, SuccessResponse)
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): SuccessResponse {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return {
      message: 'User logged out successfully',
    };
  }
}
