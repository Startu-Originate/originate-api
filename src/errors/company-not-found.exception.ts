const NOT_FOUND_ERROR_CODE = 404

export class CompanyNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Company not found.')
    this.name = 'CompanyNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
