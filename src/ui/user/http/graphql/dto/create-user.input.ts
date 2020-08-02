import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 50)
  firstName: string;

  @Field()
  @Length(1, 50)
  email: string;

  @Field()
  @Length(1, 50)
  password: string;
}
