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
    this.errorCode = errorCode || 10000;
  }
}
module.exports = { 
    HttpException, 
    ParameterException 
};