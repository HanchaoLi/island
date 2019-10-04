const Koa = require("koa");
const parser = require('koa-bodyparser')
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

const app = new Koa();
require('./app/modules/user');
InitManager.initCore(app);
app.use(catchError);
app.use(parser())

app.listen(3000);