const NOT_FOUND_ERROR_CODE = 404

export class CompanyTeamNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! CompanyTeam not found.')
    this.name = 'CompanyTeamNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
