module.exports = {
    app: {
        port: process.env.APISTAT_PORT || 8080
    }, 
    db: {
        host: process.env.APISTAT_DB_HOST || 'localhost', 
        user: process.env.APISTAT_DB_USER || 'user', 
        password: process.env.APISTAT_DB_PSWD || 'password', 
        database: process.env.APISTAT_DB || 'dbname'
    }
}; 