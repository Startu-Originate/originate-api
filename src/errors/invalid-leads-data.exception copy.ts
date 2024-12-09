const INTERNAL_SERVER_ERROR_CODE = 500

export class NotAuthorizedException extends Error {
  public readonly code: number

  constructor() {
    super('Oops! Not authorized.')
    this.name = 'NotAuthorizedException'
    this.code = INTERNAL_SERVER_ERROR_CODE
  }
}
