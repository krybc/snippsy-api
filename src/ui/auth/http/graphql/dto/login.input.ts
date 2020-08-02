import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @Length(1, 50)
  username: string;

  @Field()
  @Length(1, 50)
  password: string;
}
