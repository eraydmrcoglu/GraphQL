const { ApolloError } = require("apollo-server-errors");

class CustomError extends ApolloError {
  constructor(message) {
    super(message, "MY_ERROR_CODE");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}

module.exports = { CustomError };
