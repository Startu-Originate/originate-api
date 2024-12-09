const INTERNAL_SERVER_ERROR_CODE = 500

export class InvalidEnvironmentVariablesException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Invalid environment variables.')
    this.name = 'InvalidEnvironmentVariablesException'
    this.code = INTERNAL_SERVER_ERROR_CODE
  }
}
