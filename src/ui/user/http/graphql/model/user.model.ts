import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
