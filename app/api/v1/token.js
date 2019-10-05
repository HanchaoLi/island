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

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errs.ParameterException('no corresponding handling function');
    }
    throw new global.errs.Success();
});

async function emailLogin(account, secret) {
    const verified = await User.verifyEmailPassword(account, secret);
}

module.exports = router;