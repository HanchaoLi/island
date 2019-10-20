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
    Auth
} = require('../../../middlewares/auth');

const {
    Art
} = require('../../modules/art');

const {
    PositiveIntegerValidator
} = require('../../validators/validator');

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.getLatestFlow();
    const art = await Art.getData(flow.art_id, flow.type);
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeLatest);
    ctx.body = art;
});

router.get('/:index/next', new Auth().m, async ctx =>{
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    });
    const index = v.get('path.index');
    const flow = await Flow.getNextFlow(index);
    if (!flow) {
        throw new global.errs.NotFound();
    }
    const art = await Art.getData(flow.art_id, flow.type);
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeNext);
    ctx.body = art;
});

router.get('/:index/previous', new Auth().m, async ctx =>{
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    });
    const index = v.get('path.index');
    const flow = await Flow.getPreviousFlow(index);
    if (!flow) {
        throw new global.errs.NotFound();
    }
    const art = await Art.getData(flow.art_id, flow.type);
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likePrevious);
    ctx.body = art;
});

module.exports = router;