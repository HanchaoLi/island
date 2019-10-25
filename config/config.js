module.exports = {
    environment: 'prod',
    database: {
        dbName: 'demo',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'de123321'
    },
    security: {
        secretKey: "abcdegfsfsf33",
        expiresIn: 60*60*24*30
    },
    wx: {
        appId: 'wx85722fbe620c8498',
        appSecret: '2246820af5f0384f88d7be50fc00c0b9',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host:'http://localhost:3000/'
}