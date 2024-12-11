const UNPROCESSABLE_ENTITY_CODE = 422

export class InvalidDataTypeTypeException extends Error {
  public readonly code: number

  constructor(entity: string) {
    super(`Oops! Invalid data type to create ${entity}.`)
    this.name = 'InvalidDataTypeException'
    this.code = UNPROCESSABLE_ENTITY_CODE
  }
}
