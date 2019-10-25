const Router = require('koa-router');
const router = new Router();

const {HotBook} = require('../../modules/hot-book');

router.get('/v1/book/hot_list', async (ctx, next) => {
    const favors = await HotBook.getAll();
    ctx.body = {
        books: favors
    };
});

module.exports = router;