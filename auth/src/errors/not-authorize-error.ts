export class NotAuthorizeError extends Error {
  status = 401;

  constructor() {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Authorize" }];
  }
}
