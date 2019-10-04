const {HttpException} = require('../core/httpException');

const catchError = (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.message,
                error_code: error.errorCode,
                request: error.requestUrl
            };
            ctx.status = error.code;
        }
    }
}