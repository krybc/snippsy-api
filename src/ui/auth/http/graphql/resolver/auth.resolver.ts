import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '@application/auth/command/login/login.command';
import { LoginInput } from '../dto/login.input';
import { Jwt } from '../model/jwt';
import { User } from '@ui/user/http/graphql/model/user.model';

@Resolver(User)
export class AuthResolver {
  public constructor(
    private readonly commandBus: CommandBus,
  ) {
  }

  // @UseGuards(LocalAuthGuard)
  @Mutation(returns => Jwt)
  async login(@Args('input') input: LoginInput): Promise<Jwt> {
    return this.commandBus.execute(new LoginCommand(input.username, input.password));
  }
}
