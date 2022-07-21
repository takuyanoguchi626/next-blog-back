import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Administrator } from './dto/administrator.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthServise: AuthService) {}
  /**
   * 管理者情報を登録する.
   *
   * @param administrator - 管理者情報
   * @returns 登録した管理者情報
   */
  @Post('registerAdmin')
  registerAdmin(@Body() administrator: Administrator) {
    return this.AuthServise.registerAdmin(administrator);
  }
  /**
   * ログインする.
   *
   * @param administrator - 管理者情報
   * @returns jwtToken
   */
  @Post('login')
  login(@Body() administrator: Administrator) {
    return this.AuthServise.login(administrator);
  }
}
