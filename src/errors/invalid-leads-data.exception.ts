const INTERNAL_SERVER_ERROR_CODE = 500

export class InvalidLeadsDataException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Invalid leads data.')
    this.name = 'InvalidLeadsDataException'
    this.code = INTERNAL_SERVER_ERROR_CODE
  }
}
