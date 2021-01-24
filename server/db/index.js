// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
//
//
//
//
// // подключение
// mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
//
// const User = mongoose.model("User", userSchema);
// const user = new User({
//     name: "Bill",
//     age: 41
// });
//
// user.save(err => {
//     mongoose.disconnect(); // отключение от базы данных
//
//     if (err) return console.log(err);
//     console.log("Сохранен объект", user);
// });
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('../config');

let connection = null;

module.exports = async function () {
    console.log('Initialize DB module');

    if (connection) return connection;

    console.log('Connecting to database');
    connection = mongoose.connect("mongodb://" + config.mongodb + "/usersdb", { useNewUrlParser: true, useUnifiedTopology: true });

    // Load models
    console.log('Getting list of the existing models');

    const files = await new Promise((resolve, reject) =>
        fs.readdir(__base + '/db/models', (e, f) => e ? reject(e) : resolve(f)));
    files.forEach(filename => {
        console.log('Loading model: ' + filename);
        require(__base + '/db/models/' + filename)(mongoose);
    });

    console.log('Initialization finished');

    return connection;
};