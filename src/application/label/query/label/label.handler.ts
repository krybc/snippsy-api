import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LabelQuery } from './label.query';
import { Label } from '@domain/label/entity/label';
import { LabelRepository } from '@infrastructure/label/typeorm/repository/label.repository';
import { Connection } from 'typeorm/index';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(LabelQuery)
export class LabelHandler implements IQueryHandler<LabelQuery> {
  private labelRepository: LabelRepository;

  constructor(
    connection: Connection
  ) {
    this.labelRepository = connection.getCustomRepository(LabelRepository);
  }

  async execute(query: LabelQuery): Promise<Label> {
    const label = await this.labelRepository.findOneById(+query.id);
    if (!label) {
      throw new NotFoundException();
    }

    return label;
  }
}
