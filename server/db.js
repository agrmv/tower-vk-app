const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const userSchema = new Schema({
    name: String,
    img: String
});

// подключение
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });

const User = mongoose.model("User", userScheme);
const user = new User({
    name: "Bill",
    age: 41
});

user.save(err => {
    mongoose.disconnect(); // отключение от базы данных

    if (err) return console.log(err);
    console.log("Сохранен объект", user);
});