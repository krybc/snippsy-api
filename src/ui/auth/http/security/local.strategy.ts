import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
