const NOT_FOUND_ERROR_CODE = 404

export class ActivityNotFoundException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Activity not found.')
    this.name = 'ActivityNotFoundException'
    this.code = NOT_FOUND_ERROR_CODE
  }
}
