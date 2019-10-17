class HttpException extends Error {
  constructor(msg = "server error", errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "param error";
    this.errorCode = errorCode || 10002;
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || "ok";
    this.errorCode = errorCode || 0;
  }
}

class NotFoud extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.msg = msg || " missing resource";
    this.errorCode = errorCode || 10003;
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 401;
    this.msg = msg || "grant access failed";
    this.errorCode = errorCode || 10004;
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.msg = msg || "you are forbbiden to view this page";
    this.errorCode = errorCode || 10006;
  }
}

class LikeError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 405;
    this.msg = msg || "you already liked this";
    this.errorCode = errorCode || 10007;
  }
}
class DislikeError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 406;
    this.msg = msg || "you already cancelled this like";
    this.errorCode = errorCode || 10008;
  }
}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFoud,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError
};