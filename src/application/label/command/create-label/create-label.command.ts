export class CreateLabelCommand {
  constructor(
    public readonly name: string,
    public readonly color?: string,
    public readonly starred?: boolean,
  ) {
  }
}
