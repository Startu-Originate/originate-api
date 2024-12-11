const CONFLICT_ERROR_CODE = 409

export class CNPJNotAvailableException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! CNPJ not available.')
    this.name = 'CNPJNotAvailableException'
    this.code = CONFLICT_ERROR_CODE
  }
}
