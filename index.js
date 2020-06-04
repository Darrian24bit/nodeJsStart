const express = require("express"); //конектим сервак

const port = process.env.port || 3030; //

const app = express();

//const collectionRouts = require("./routes/colection.js"); //конектим роутер из /routes

const mongoose = require("mongoose"); //mongo dB

const expressHb = require("express-handlebars");

const hbs = expressHb.create({
  defaultLayout: "main",
  extname: "hbs", //конфиг шаблонизатора
});

app.engine("hbs", hbs.engine); //регаем движок

app.set("view engine", "hbs");

app.set("views", "views");

//app.use(collectionRouts);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://darrian24:tyz24cv@cluster0-9ls8b.mongodb.net/nodeDb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true, //убираем ворнинги
      }
    );
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log("server has been started");
  });
} //асинхронная функция ждет пока запустится база данных и запускает сервер

app.get("/", function (req, res) {
  res.render("index");
});

const db = mongoose.connection; //работаем с бд

db.on("error", (err) => {
  console.log("error", err);
}); //test on err

db.once("open", () => {
  console.log("we are connected");
}); //успешно подключились к базе и можем писать наши запросы

const User = require("./models/user");

const user = new User({ name: "Alex" });

user.save((err, user) => {
  if (err) {
    console.log("err", err);
  }
  console.log("saved user", user);
});

User.findById("59d8acf4ce867b292ddb815e", (err, user) => {
  console.log("result", err, user);
});

start();
