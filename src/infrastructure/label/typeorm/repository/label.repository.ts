import { EntityRepository, Repository, SaveOptions } from 'typeorm';
import { Label } from '@domain/label/entity/label';

@EntityRepository(Label)
export class LabelRepository extends Repository<Label> {
  async save<Label>(entity: Label, options?: SaveOptions): Promise<Label> {
    return await super.save(entity);
  }

  async findOneById(id: number): Promise<Label> {
    return await super.findOne({ id: id });
  }
}
