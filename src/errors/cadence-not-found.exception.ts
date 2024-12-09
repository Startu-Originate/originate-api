const NOT_FOUND_ERROR_CODE = 404

export class CadenceNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Cadence not found.')
    this.name = 'CadenceNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
