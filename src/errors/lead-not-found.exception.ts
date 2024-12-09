const NOT_FOUND_ERROR_CODE = 404

export class LeadNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Lead not found.')
    this.name = 'LeadNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
