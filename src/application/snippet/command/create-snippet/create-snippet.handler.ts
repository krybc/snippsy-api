import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';
import { CreateSnippetCommand } from '@application/snippet/command/create-snippet/create-snippet.command';
import { SnippetRepository } from '@infrastructure/snippet/typeorm/repository/snippet.repository';
import { SnippetFactory } from '@domain/snippet/factory/snippet.factory';
import { Snippet } from '@domain/snippet/entity/snippet';

@CommandHandler(CreateSnippetCommand)
export class CreateSnippetHandler implements ICommandHandler<CreateSnippetCommand> {
  private snippetRepository: SnippetRepository;

  public constructor(
    private factory: SnippetFactory,
    connection: Connection,
  ) {
    this.snippetRepository = connection.getCustomRepository(SnippetRepository);
  }

  async execute(command: CreateSnippetCommand): Promise<Snippet> {
    const snippet = this.factory.createFromCreateCommand(command);
    return await this.snippetRepository.save(snippet);
  }
}
