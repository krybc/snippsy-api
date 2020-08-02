import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class CreateLabelInput {
  @Field()
  @Length(1, 5)
  name: string;

  @Field()
  color: string;

  @Field({ defaultValue: false})
  @IsOptional()
  starred?: boolean;
}
