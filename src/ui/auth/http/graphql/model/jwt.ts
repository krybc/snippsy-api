import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Jwt {
  @Field(type => String)
  accessToken: string;
}
