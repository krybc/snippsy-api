import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Snippet {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  starred: boolean;
}
