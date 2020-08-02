import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';
import { SnippetRepository } from '@infrastructure/snippet/typeorm/repository/snippet.repository';
import { SnippetFactory } from '@domain/snippet/factory/snippet.factory';
import { Snippet } from '@domain/snippet/entity/snippet';
import { UpdateSnippetCommand } from '@application/snippet/command/update-snippet/update-snippet.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateSnippetCommand)
export class UpdateSnippetHandler implements ICommandHandler<UpdateSnippetCommand> {
  private snippetRepository: SnippetRepository;

  public constructor(
    private factory: SnippetFactory,
    connection: Connection,
  ) {
    this.snippetRepository = connection.getCustomRepository(SnippetRepository);
  }

  async execute(command: UpdateSnippetCommand): Promise<Snippet> {
    let snippet = await this.snippetRepository.findOneById(command.id);
    if (!snippet) {
      throw new NotFoundException();
    }

    snippet = this.factory.createFromUpdateCommand(snippet, command);

    return await this.snippetRepository.save(snippet);
  }
}
