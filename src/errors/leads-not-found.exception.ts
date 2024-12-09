const NOT_FOUND_ERROR_CODE = 404

export class LeadsNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Leads not found.')
    this.name = 'LeadsNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
