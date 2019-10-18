const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});
const {
    Flow
} = require('../../modules/flow');

const {
    Favor
} = require('../../modules/favor');

const {
    PositiveIntegerValidator
} = require('../../validators/validator');
const {
    Auth
} = require('../../../middlewares/auth');

const {
    Art
} = require('../../modules/art');

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.getLatestFlow();
    const art = await Art.getData(flow.art_id, flow.type);
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeLatest);
    ctx.body = art;
});

module.exports = router;