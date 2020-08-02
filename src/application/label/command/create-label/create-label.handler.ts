import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLabelCommand } from './create-label.command';
import { Label } from '@domain/label/entity/label';
import { LabelRepository } from '@infrastructure/label/typeorm/repository/label.repository';
import { Connection } from 'typeorm/index';
import { LabelFactory } from '@domain/label/factory/label.factory';

@CommandHandler(CreateLabelCommand)
export class CreateLabelHandler implements ICommandHandler<CreateLabelCommand> {
  private labelRepository: LabelRepository;

  public constructor(
    private factory: LabelFactory,
    connection: Connection,
  ) {
    this.labelRepository = connection.getCustomRepository(LabelRepository);
  }

  async execute(command: CreateLabelCommand): Promise<Label> {
    const label = this.factory.createFromCreateCommand(command);
    return await this.labelRepository.save(label);
  }
}
