import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LabelsQuery } from './labels.query';
import { Label } from '@domain/label/entity/label';
import { LabelRepository } from '@infrastructure/label/typeorm/repository/label.repository';
import { Connection } from 'typeorm/index';

@QueryHandler(LabelsQuery)
export class LabelsHandler implements IQueryHandler<LabelsQuery> {
  private labelRepository: LabelRepository;

  constructor(
    connection: Connection
  ) {
    this.labelRepository = connection.getCustomRepository(LabelRepository);
  }

  async execute(query: LabelsQuery): Promise<Label[]> {
    return await this.labelRepository.find();
  }
}
