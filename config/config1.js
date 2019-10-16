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
        appId: 'wx8577fbe620c8498',
        appSecret: '7948e0d625b70d5177cd73c3e3bc8f09',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}