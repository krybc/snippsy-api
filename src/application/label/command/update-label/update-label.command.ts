export class UpdateLabelCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly color?: string,
    public readonly starred?: boolean
  ) {
  }
}
