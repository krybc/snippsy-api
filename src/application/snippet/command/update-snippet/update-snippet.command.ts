export class UpdateSnippetCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description?: string,
    public readonly content?: string,
    public readonly starred?: boolean,
  ) {
  }
}
