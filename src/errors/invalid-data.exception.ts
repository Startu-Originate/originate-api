const BAD_REQUEST_CODE = 400

export class InvalidDataException extends Error {
  public readonly code: number

  constructor(entity: string) {
    super(`Oops! Invalid data to create ${entity}.`)
    this.name = 'InvalidDataException'
    this.code = BAD_REQUEST_CODE
  }
}
