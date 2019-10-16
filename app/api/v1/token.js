const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/token'
});
const {
    TokenValidator
} = require('../../validators/validator');
const {
    LoginType
} = require('../../lib/enum');
const {
    User
} = require('../../modules/user');
const {
    generateToken
} = require('../../../core/util');
const {
    Auth
} = require('../../../middlewares/auth');
const {
    WXManager
} = require('../../../services/wx');


router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'));
            break;
        default:
            throw new global.errs.ParameterException('no corresponding handling function');
    }
    ctx.body = {
        token
    }
});

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return token = generateToken(user.id, Auth.USER);
}

module.exports = router;