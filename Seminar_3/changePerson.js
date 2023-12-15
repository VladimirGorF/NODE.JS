// Задание No3
// 1. Создайте файл changePerson.js рядом с файлом writePerson.js
// 2. Напишите в нем код, который
// ➜ прочитает файл person.json,
// ➜ уменьшит возраст на 10
// ➜ изменит город на “Ekaterinburg”
// ➜ перезапишет исходный файл person.json
// 💡 Подсказки:
// - Для преобразования текста в объект, необходимо использовать
// функцию JSON.parse()
// - Также не забывайте, что путь к файлу необходимо формировать
// с помощью path.join() и __dirname
// - Используйте синхронные методы чтения и записи

// const fs = require('fs');
// const path = require('path');
// const pathToFile = path.join(__dirname, 'person.json');

// const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

// data.age -= 10; 
// data.city = 'Ekaterinburg';

// fs.writeFileSync(pathToFile, JSON.stringify(data, null, 5)); // 2 параметр массиив свойств объекта

