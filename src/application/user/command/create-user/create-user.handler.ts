import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '@infrastructure/user/typeorm/repository/user.repository';
import { Connection } from 'typeorm/index';
import { UserFactory } from '@domain/user/factory/user.factory';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private userRepository: UserRepository;

  constructor(
    private factory: UserFactory,
    connection: Connection
  ) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  async execute(command: CreateUserCommand) {
    const user = await this.factory.createFromCreateCommand(command);
    return await this.userRepository.save(user);
  }
}
