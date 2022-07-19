import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Administrator } from './dto/administrator.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthServise: AuthService) {}

  @Post('registerAdmin')
  registerAdmin(@Body() administrator: Administrator) {
    return this.AuthServise.registerAdmin(administrator);
  }

  @Post('login')
  login(@Body() administrator: Administrator) {
    return this.AuthServise.login(administrator);
  }
}
