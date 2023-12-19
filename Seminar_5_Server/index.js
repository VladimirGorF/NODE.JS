const express = require("express");
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(5).required(),
  secondName: Joi.string().min(5).required(),
  city: Joi.string().min(2),
  age: Joi.number().min(0).required(),
});
const app = express();

app.use(express.static('static'));

app.use(express.json());
const users = [
  {
    id: 1,
    name: "Ivan",
    secondName: "Smirnov",
    city: "Moscow",
    age: 25,
  },
];
let uniqId = 1;

app.get("/users", (req, res) => {
  res.send({ users });
});

app.post("/users", (req, res) => {
    console.log(req.body);
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  uniqId++;
  users.push({ id: uniqId, ...req.body });
  res.send({ id: uniqId });
});

app.put("/users/:id", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = req.body.name;
    user.secondName = req.body.secondName;
    user.age = req.body.age;
    user.city = req.body.city;

    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(3000);
