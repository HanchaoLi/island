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
    }
}