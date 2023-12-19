// Урок 4. Создание REST API с Express
// Для того, чтобы пользователи хранились постоянно, а не только, когда запущен сервер, необходимо реализовать хранение массива в файле.
// Подсказки:
// — В обработчиках получения данных по пользователю нужно читать файл
// — В обработчиках создания, обновления и удаления нужно файл читать, чтобы убедиться, что пользователь существует, а затем сохранить в файл, когда внесены изменения
// — Не забывайте про JSON.parse() и JSON.stringify() - эти функции помогут вам переводить объект в строку и наоборот.

const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const pathToFile = path.join(__dirname, "data.json");

// правила валидации входящего объекта
const schema = Joi.object({
  name: Joi.string().min(5).required(),
  secondName: Joi.string().min(5).required(),
  city: Joi.string().min(2),
  age: Joi.number().min(0).required(),
});

// id для каждого нового пользователя
let uniqId = 1;

app.get("/users", (req, res) => {
  //  считывем БД
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const users = JSON.parse(data); //  получаем наш  массив объектов
    // отображаем на странице
    res.send(users);
  });
});

app.post("/users", (req, res) => {
  const result = schema.validate(req.body); // валидируем входящий объект на предмет соответствия на схеме валидации в 5 стр.
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  // если валидация пройдена, то cчитывем БД
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const users = JSON.parse(data); // получаем наш массив из БД

    // создаем из входящих данных нового пользователя.
    uniqId++;
    users.push({ id: uniqId, ...req.body }); //вносим в наш массив

    // перезаписываем файл с БД
    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("File was writed");
      }
    });
    res.send(users);
  });
});

// обновление
app.put("/users/:id", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  // если валидация пройдена, то cчитывем БД
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const users = JSON.parse(data); // получаем наш массив из БД

    //работаем с id и массивом
    const id = +req.params.id; // параметр id приходит строкой, плюсом делаем ее цифрой
    const user = users.find((user) => user.id === id);
    if (user) {
      // если нашелся такой user, записываем новые данные построчно
      user.name = req.body.name;
      user.secondName = req.body.secondName;
      user.age = req.body.age;
      user.city = req.body.city;

      res.send({ user }); // возвращаем обновленного пользователя
    } else {
      res.status(404);
      res.send({ user: null });
    }

    // перезаписываем файл с БД
    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("File was writed");
      }
    });
  });
});

// поиск по id
app.get("/users/:id", (req, res) => {
  // считываем БД
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const id = +req.params.id; //  берем id из параметров пути
    const users = JSON.parse(data); // получаем наш  массив объектов
    //ищем
    const user = users.find((user) => user.id === id);
    if (user) {
      res.send({ user });
    } else {
      res.status(404);
      res.send({ user: null }); // отпарвляем ответ на сайт
    }
  });
});

// удаление по id
app.delete("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    const users = JSON.parse(data); //  получаем наш  массив объектов
    // работаем с ним
    const id = +req.params.id;
    const user = users.find((user) => user.id === id);
    if (user) {
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      res.send({ user });

      // перезаписываем файл с БД
      fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("File was writed");
        }
      });
    } else {
      res.status(404);
      res.send({ user: null });
    }
  });
});

app.listen(3000);
