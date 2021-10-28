const config = require("./config.json");

let dsn = process.env.MONGODB_DSN || `mongodb+srv://${config.username}:${config.password}@cluster0.jarpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

if (process.env.NODE_ENV == "test") {
    dsn = "mongodb://127.0.0.1:27017/docs_test"
}



module.exports = {
    url: dsn
};
