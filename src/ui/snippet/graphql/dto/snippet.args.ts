import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SnippetArgs {
  @Field()
  id: number;
}
