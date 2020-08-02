export class CreateSnippetCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string,
    public readonly starred?: boolean,
  ) {
  }
}
