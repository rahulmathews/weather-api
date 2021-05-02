const mongoose = require('mongoose');

//set options
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('runValidators', true);
mongoose.set('useUnifiedTopology', true)

//mongodb connnection
mongoose.connect(process.env.DB_MONGODB_CONNECTION_URL);

console.log("url->", process.env.DB_MONGODB_CONNECTION_URL);

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.log(err);
    process.exit(err.code || 1);
});

connection.once("open", () => {
    console.log("Connection with database succeeded.");
});

module.exports = connection;