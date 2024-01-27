class HTMLParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "HTMLParseError"
    Object.setPrototypeOf(this, HTMLParseError.prototype)
  }
}

class InvalidParamsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidParamsError"
    Object.setPrototypeOf(this, InvalidParamsError.prototype)
  }
}

export { HTMLParseError, InvalidParamsError }
