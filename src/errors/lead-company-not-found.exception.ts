const NOT_FOUND_ERROR_CODE = 404

export class LeadCompanyNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Lead-Company not found.')
    this.name = 'LeadCompanyNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
