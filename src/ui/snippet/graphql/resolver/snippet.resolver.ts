import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@ui/auth/http/security/jwt-auth.guard';
import { Snippet } from '@ui/snippet/graphql/model/snippet.model';
import { SnippetArgs } from '@ui/snippet/graphql/dto/snippet.args';
import { SnippetsArgs } from '@ui/snippet/graphql/dto/snippets.args';
import { CreateSnippetInput } from '@ui/snippet/graphql/dto/create-snippet.input';
import { SnippetQuery } from '@application/snippet/query/snippet/snippet.query';
import { CreateSnippetCommand } from '@application/snippet/command/create-snippet/create-snippet.command';
import { SnippetsQuery } from '@application/snippet/query/snippets/snippets.query';

@Resolver(of => Snippet)
export class SnippetResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => [Snippet])
  async snippets(@Args() snippetsArgs: SnippetsArgs): Promise<Snippet[]> {
    return await this.queryBus.execute(new SnippetsQuery());
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => Snippet)
  async snippet(@Args() labelArgs: SnippetArgs): Promise<Snippet> {
    return this.queryBus.execute(new SnippetQuery(labelArgs.id));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Snippet)
  async createSnippet(@Args('input') input: CreateSnippetInput) {
    return this.commandBus.execute(new CreateSnippetCommand(input.name, input.description, input.starred));
  }
}
