const NOT_FOUND_ERROR_CODE = 404

export class UserTeamNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! User-Team not found.')
    this.name = 'UserTeamNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
