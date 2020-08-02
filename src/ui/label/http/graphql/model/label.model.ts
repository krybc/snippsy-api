import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Label {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  starred: boolean;
}
