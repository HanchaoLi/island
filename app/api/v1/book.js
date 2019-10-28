const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/book'
});

const {
    PositiveIntegerValidator,
    SearchValidator
} = require('../../validators/validator');
const {
    HotBook
} = require('../../modules/hot-book');
const {
    Book
} = require('../../modules/book');

router.get('/hot_list', async (ctx, next) => {
    const books = await HotBook.getAll();
    ctx.body = {
        books: books
    };
});

router.get('/:id/detail', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx);
    const book = await new Book(v.get('path.id'));
    ctx.body = await book.detail();
});

router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx);
    const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'));
    ctx.body = result;
});

module.exports = router;