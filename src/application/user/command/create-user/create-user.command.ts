export class CreateUserCommand {
  constructor(
    public readonly firstName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
  }
}
