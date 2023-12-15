// Домашнее задание
// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:
// - На каждой странице реализован счетчик просмотров
// - Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// - Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// - Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер
// 💡 Подсказка:
// Вы можете сохранять файл в формате JOSN, где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы
const ex = require("express");
const app = ex();
const fs = require("fs");
const path = require("path");
const pathToFile = path.join(__dirname, "data.json");

app.get("/", (req, res) => {
  // считывем хранилище data
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const newData = JSON.parse(data); // преобразуем джейсон в объект
      newData["/"] += 1; // поменяли значение

      // отображаем на странице
      res.send(
        `<h1>Главная страница</h1>  <h2>Вы посетили главную страницу: ${newData["/"]} раз</h2> <a href="/about" >Link to About</a> <br> 
        <a href="/reset" >Обнулить счетчик</a>`
      );
      // записываем файл с измененными данными
      fs.writeFile(pathToFile, JSON.stringify(newData, null, 2), (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("File was writed");
        }
      });
    }
  });
});

app.get("/about", (req, res) => {
  // считывем хранилище data
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const newData = JSON.parse(data); // преобразуем джейсон в объект
      newData["/about"] += 1; // прибавили счетчик по ключу /about

      // отображаем на странице
      res.send(
        `<h1>This is About</h1>  <h2>Вы посетили страницу about: ${newData["/about"]} раз</h2> <a href="/" >Link to Main</a>`
      );
      // записываем файл с новым объектом чтобы потом снова взять данные
      fs.writeFile(pathToFile, JSON.stringify(newData, null, 2), (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("File was writed");
        }
      });
    }
  });
});

// сброс счетчика
app.get("/reset", (req, res) => {
  // отображаем на странице
  res.send(
    `<h1>This is Reset Page</h1>  <h2>Данные счетчика Обнулены!</h2> <a href="/" >Link to Main</a>`
  );
  // записываем файл с новым объектом чтобы потом снова взять данные
  const newData = {
    "/": 0,
    "/about": 0,
  };
  fs.writeFile(pathToFile, JSON.stringify(newData, null, 2), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("File was cleaned");
    }
  });
});

app.listen(3000);
