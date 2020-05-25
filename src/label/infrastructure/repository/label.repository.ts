import { EntityRepository, Repository } from 'typeorm';
import { Label } from '../../domain/label.entity';
import { LabelRepositoryInterface } from '../../domain/label.repository.interface';

@EntityRepository(Label)
export class LabelRepository extends Repository<Label> implements LabelRepositoryInterface {

}
