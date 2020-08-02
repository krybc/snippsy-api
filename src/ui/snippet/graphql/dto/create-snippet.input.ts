import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class CreateSnippetInput {
  @Field()
  @Length(1, 5)
  name: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field()
  language: string;

  @Field({ defaultValue: false})
  @IsOptional()
  starred?: boolean;
}
