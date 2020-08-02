import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Label } from '../model/label.model';
import { CreateLabelInput } from '../dto/create-label.input';
import { CreateLabelCommand } from '@application/label/command/create-label/create-label.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LabelsArgs } from '../dto/labels.args';
import { LabelsQuery } from '@application/label/query/labels/labels.query';
import { LabelArgs } from '../dto/label.args';
import { LabelQuery } from '@application/label/query/label/label.query';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@ui/auth/http/security/jwt-auth.guard';

@Resolver(of => Label)
export class LabelResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => [Label])
  async labels(@Args() labelsArgs: LabelsArgs): Promise<Label[]> {
    return await this.queryBus.execute(new LabelsQuery());
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => Label)
  async label(@Args() labelArgs: LabelArgs): Promise<Label> {
    return this.queryBus.execute(new LabelQuery(labelArgs.id));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Label)
  async createLabel(@Args('input') input: CreateLabelInput) {
    return this.commandBus.execute(new CreateLabelCommand(input.name, input.color, input.starred));
  }
}
