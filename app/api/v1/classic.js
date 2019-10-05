const Router = require('koa-router');
const router = new Router();

const {
    PositiveIntegerValidator
} = require('../../validators/validator');

router.get('/v1/:id/classic/latest', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'id'
    });
    ctx.body = {
        key: 'classic'
    };
});

module.exports = router;