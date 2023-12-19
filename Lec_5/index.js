// const express = require("express");
// const app = express();
// Глобальный обработчки без пути типа "/about" и тп
//  app.use( (req, res, next) => {
//   console.log("Globalism here!", req.method, req.url);
//   next();  // вызов следующего обработчика автоматом
// });
// app.get("/", (req, res) => {
//   console.log("Запрос поступил!", req.method, req.url);
//   res.send("Hello lorem100");
// });
// app.get("/about", (req, res) => {
//   console.log("Запрос поступил!", req.method, req.url);
//   res.send("About Page");
// });

// app.listen(3000);

// два обработчика в одной функции
// const express = require("express");
// const app = express();
// app.get(
//   "/ab*out",
//   (req, res, next) => {
//     console.log("Запрос поступил!", req.method, req.url);
//     next();
//   },
//   (req, res) => {
//send только 1 раз срабатывает
//     res.send("<h1>Hello About</h1>");
//   }
// );
// app.listen(3000);

// Отправка файлов
// const express = require("express");
// const path = require("path");
// const app = express();
// app.get(
//   "/",
//   (req, res) => {
//     res.sendFile(path.join(__dirname, "./index.html"));
//   }
// );
// app.listen(3000);

// // Статика
// const express = require("express");
// const app = express();
// app.use(express.static('static')) // будем использовать статичную папку складывая в нее все ресурсы, страницы, стили, фотки
// app.get(
//   "/",
//   (req, res) => {
//     res.sendFile("static/index.html");
//   }
// );
// app.listen(3000);

// Отправка файлов
const express = require("express");
const app = express();
app.use(express.json());
app.post("/", (req, res) => {
  console.log(req.body);
  res.send('Post request');
});
app.listen(3000);
