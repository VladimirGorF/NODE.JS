// Задание No4
// 1. Инициализируйте проект NPM.
// 2. Установите библиотеку express.
// 3. Создайте файл index.js.
// 4. В файле напишите код который реализует два обработчика по URL “/” и URL
// “/about”.
// 5. В каждом обработчике верните HTML код, в котором есть заголовок и ссылка
// на соседнюю страницу.
// 10 мин

// const express = require('express');
// const app = express();
// app.get('/', (req,res) => {
// res.send('<h1>Главная страница</h1> <a href="/about">AboutPage</a>')
// })
// app.get('/about', (req,res) => {
// res.send('<h1>Страница обо мне</h1> <a href="/">Главная старница</a>')
// })

// app.listen(3000);


const express = require('express');
const app = express();
app.use(express.static('static'));

app.listen(3000);
