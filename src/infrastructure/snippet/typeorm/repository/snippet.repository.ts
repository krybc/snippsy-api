import { EntityRepository, Repository } from 'typeorm';
import { Snippet } from '@domain/snippet/entity/snippet';

@EntityRepository(Snippet)
export class SnippetRepository extends Repository<Snippet> {
  async findOneById(id: number): Promise<Snippet> {
    return await super.findOne({ id: id });
  }
}
