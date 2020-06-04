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

start();
