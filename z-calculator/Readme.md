Calculate by using your own precision.

Quickstart

1. Install

npm install gor-calculator

2. Create a calculator and usage.

Way 1:

const go = require("gor-calculator");

res = go.calculator(2.456, 3, "-", 2);

console.log(res);

Way 2:

const {calculator} = require("gor-calculator");

console.log(calculator(2.457, 3, "/", 2));

