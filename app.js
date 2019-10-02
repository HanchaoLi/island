const Koa = require('koa');

const app = new Koa();

// call test function for each time http successfully sent
app.use(() => {
    console.log('server is running!');
});

app.listen(3000);