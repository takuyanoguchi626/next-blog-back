import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrator } from './dto/administrator.dto';
import { Administrator as adminInterface } from './interfaces/Administrator.interface';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('administrators')
    private readonly administratorModel: Model<adminInterface>,
    private readonly JwtService: JwtService,
  ) {}
  /**
   * 管理者を登録する.
   *
   * @param administrator - 登録する管理者情報
   * @returns 登録された管理者情報
   */
  async registerAdmin(administrator: Administrator) {
    const newAdministrator = new this.administratorModel({
      administratorId: administrator.administratorId,
      password: await bcrypt.hash(administrator.password, 12),
    });
    return await newAdministrator.save();
  }
  /**
   * ログインする管理者情報がDBに存在するかの照合をする.
   *
   * @param administrator - 照合する管理者情報
   * @returns 管理者情報が存在したかのブーリアン値
   */
  async validateAdmin(administrator: Administrator) {
    const admin = await this.administratorModel.findOne({
      administratorId: administrator.administratorId,
    });
    const isValid = await bcrypt.compare(
      administrator.password,
      admin.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return isValid;
  }
  /**
   * ログインをする.
   *
   * @param administrator - 管理者情報
   */
  async login(administrator: Administrator) {
    if (await this.validateAdmin(administrator)) {
      const payload = { adminId: administrator.administratorId };
      return {
        accessToken: this.JwtService.sign(payload),
      };
    }
  }
}
