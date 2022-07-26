export default class InvalidParamError extends Error {
  constructor(message = 'InvalidParamError') {
    super(message)
    this.name = 'InvalidParamError'
  }
}
