import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LabelArgs {
  @Field()
  id: number;
}
