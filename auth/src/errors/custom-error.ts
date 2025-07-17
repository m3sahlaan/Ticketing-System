export class CustomError extends Error {
  status: number;

  constructor(public message: string, status: number = 400) {
    // Default to 400 if not provided
    super(message); // Pass the message to the base Error class

    this.status = status;

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
