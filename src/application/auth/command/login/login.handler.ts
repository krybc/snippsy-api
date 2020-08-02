import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@infrastructure/user/typeorm/repository/user.repository';
import { Connection } from 'typeorm/index';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  private userRepository: UserRepository;

  public constructor(
    private readonly jwtService: JwtService,
    connection: Connection,
  ) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  async execute(command: LoginCommand): Promise<any> {
    const user = await this.userRepository.findOne({
      email: command.username
    });

    const payload = {username: command.username, sub: user.id};
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken
    }
  }
}
