"use strict";
// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require("http");
let counterMain = 0; // счетчики посещения страницы
let counterAbout = 0; 
let counterNotFound= 0; 
const server = http.createServer((req, res) => {
  console.log("Запрос получен");
  if (req.url === "/") {
    counterMain++;
    res.writeHead(200, {
      Content_Type: "text/html; charset=UTF-8",
    });
    res.end(
      `<p>This is Page Main. Visited ${counterMain} times</p><a href="http://localhost:3001/about">Link to About </a>`
    );
  } else if (req.url === "/about") {
    counterAbout++;
    res.writeHead(200, {
      Content_Type: "text/html; charset=UTF-8",
    });
    res.end(
      `<p>This is Page About. Visited ${counterAbout} times</p><a href="http://localhost:3001/">Link to the Main </a>`
    );
  } else {
    counterNotFound++;
    res.writeHead(404, {
      Content_Type: "text/html; charset=UTF-8",
    });
    res.end(`<p>404 Page Not Found Visited ${counterNotFound} times  </p> 
       <a href="http://localhost:3001/">Go to Main </a> 
`);
  }
});

const port = 3001;

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
