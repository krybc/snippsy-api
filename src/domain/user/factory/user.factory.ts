import { CreateUserCommand } from '@application/user/command/create-user/create-user.command';
import { User } from '@domain/user/entity/user';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class UserFactory {
  public async createFromCreateCommand(command: CreateUserCommand): Promise<User> {
    const user = new User();
    user.firstName = command.firstName;
    user.email = command.email;
    user.password = await hash(command.password, 10);

    return user;
  }
}
