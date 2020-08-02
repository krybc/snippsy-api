import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';
import { Snippet } from '@domain/snippet/entity/snippet';
import { SnippetRepository } from '@infrastructure/snippet/typeorm/repository/snippet.repository';
import { SnippetsQuery } from '@application/snippet/query/snippets/snippets.query';

@QueryHandler(SnippetsQuery)
export class SnippetsHandler implements IQueryHandler<SnippetsQuery> {
  private snippetRepository: SnippetRepository;

  constructor(
    connection: Connection
  ) {
    this.snippetRepository = connection.getCustomRepository(SnippetRepository);
  }

  async execute(query: SnippetsQuery): Promise<Snippet[]> {
    return await this.snippetRepository.find();
  }
}
