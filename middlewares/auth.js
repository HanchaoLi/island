const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
class Auth {
    constructor(level) {
        this.level = level || 1;
        Auth.USER = 8;
        Auth.ADMIN = 16;
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
            if (decode.scope < this.level) {
                errorMsg = 'not enough access level';
                throw new global.errs.Forbbiden(errorMsg);
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            };
            await next();
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = {
    Auth
}