import { EntityRepository, Repository } from 'typeorm';
import { Snippet } from '../../domain/snippet.entity';

@EntityRepository(Snippet)
export class SnippetRepository extends Repository<Snippet>{

}
