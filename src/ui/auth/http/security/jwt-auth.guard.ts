import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    console.log(context);
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx);
    return ctx.getContext().req;
  }
}
