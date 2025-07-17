export class NotFoundError extends Error {
  status = 404;

  constructor() {
    super("Route not found");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
