import { Injectable } from '@nestjs/common';
import { CreateSnippetCommand } from '@application/snippet/command/create-snippet/create-snippet.command';
import { Snippet } from '@domain/snippet/entity/snippet';
import { UpdateSnippetCommand } from '@application/snippet/command/update-snippet/update-snippet.command';

@Injectable()
export class SnippetFactory {
  public createFromCreateCommand(command: CreateSnippetCommand): Snippet {
    const snippet = new Snippet();
    snippet.name = command.name;
    snippet.description = command.description;
    snippet.starred = command.starred;

    return snippet;
  }

  public createFromUpdateCommand(snippet: Snippet, command: UpdateSnippetCommand): Snippet {
    snippet.name = command.name;
    snippet.description = command.description;
    snippet.starred = command.starred;

    return snippet;
  }
}
