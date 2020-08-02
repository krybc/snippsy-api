import { CreateLabelCommand } from '@application/label/command/create-label/create-label.command';
import { Label } from '@domain/label/entity/label';
import { UpdateLabelCommand } from '@application/label/command/update-label/update-label.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LabelFactory {
  public createFromCreateCommand(command: CreateLabelCommand): Label {
    const label = new Label();
    label.name = command.name;
    label.color = command.color;
    label.starred = command.starred;

    return label;
  }

  public createFromUpdateCommand(label: Label, command: UpdateLabelCommand): Label {
    label.name = command.name;
    label.color = command.color;
    label.starred = command.starred;

    return label;
  }
}
