import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SnippetQuery } from './snippet.query';
import { Connection } from 'typeorm/index';
import { NotFoundException } from '@nestjs/common';
import { Snippet } from '@domain/snippet/entity/snippet';
import { SnippetRepository } from '@infrastructure/snippet/typeorm/repository/snippet.repository';

@QueryHandler(SnippetQuery)
export class SnippetHandler implements IQueryHandler<SnippetQuery> {
  private snippetRepository: SnippetRepository;

  constructor(
    connection: Connection
  ) {
    this.snippetRepository = connection.getCustomRepository(SnippetRepository);
  }

  async execute(query: SnippetQuery): Promise<Snippet> {
    const snippet = await this.snippetRepository.findOneById(+query.id);
    if (!snippet) {
      throw new NotFoundException();
    }

    return snippet;
  }
}
