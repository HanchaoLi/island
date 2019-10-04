const {HttpException, ParameterException} = require('../core/http-exception');

const catchError = (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (global.config.environment === 'dev') {
            throw error;
        }
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.message,
                error_code: error.errorCode,
                request: error.requestUrl
            };
            ctx.status = error.code;
        } else {
            ctx.body = {
                msg: 'we made a mistake, sorry about that',
                error_code: 99999,
                request: error.requestUrl
            };
            ctx.status = 500;
        }
    }
}

module.exports = catchError