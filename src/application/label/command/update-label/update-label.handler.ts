import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLabelCommand } from './update-label.command';
import { Label } from '@domain/label/entity/label';
import { LabelRepository } from '@infrastructure/label/typeorm/repository/label.repository';
import { LabelFactory } from '@domain/label/factory/label.factory';
import { Connection } from 'typeorm/index';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateLabelCommand)
export class UpdateLabelHandler implements ICommandHandler<UpdateLabelCommand> {
  private labelRepository: LabelRepository;

  constructor(
    private factory: LabelFactory,
    connection: Connection
  ) {
    this.labelRepository = connection.getCustomRepository(LabelRepository);
  }

  async execute(command: UpdateLabelCommand): Promise<Label> {
    let label = await this.labelRepository.findOneById(command.id);
    if (!label) {
      throw new NotFoundException();
    }

    label = this.factory.createFromUpdateCommand(label, command);

    return await this.labelRepository.save(label);
  }
}
