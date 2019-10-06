const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
class Auth {
    constructor() {

    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);
            let errorMsg = 'token is illigeal';
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden();
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey);
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errorMsg = 'token has expired'
                }
                throw new global.errs.Forbbiden(errorMsg);
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            };
            await next();
        }
    }
}

module.exports = {
    Auth
}