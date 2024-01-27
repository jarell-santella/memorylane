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

class InvalidDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidDataError"
    Object.setPrototypeOf(this, InvalidDataError.prototype)
  }
}

export { HTMLParseError, InvalidDataError }
