import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../model/user.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput } from '../dto/create-user.input';
import { CreateUserCommand } from '@application/user/command/create-user/create-user.command';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Mutation(returns => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(input.firstName, input.email, input.password));
  }
}
