function calculator(num1, num2, operator, precision) {
  if (precision < 0) {
    return "Use a precision number from 0 to 16!";
  }
  precision = Math.pow(10, precision);

  switch (operator) {
    case "+":
      let res1 = num1 + num2;
      if (precision === 1 && res1 < 1) {
        precision = 10;
      }
      return Math.round((num1 + num2) * precision) / precision;
    case "-":
      let res2 = num1 - num2;
      if (precision === 1 && res2 < 1) {
        precision = 10;
      }
      return Math.round((num1 - num2) * precision) / precision;
    case "/":
      let res3 = num1 / num2;
      if (precision === 1 && res3 < 1) {
        precision = 10;
      }
      return Math.round((num1 / num2) * precision) / precision;
    case "*":
      let res4 = num1 * num2;
      if (precision === 1 && res4 < 1) {
        precision = 10;
      }
      return Math.round(num1 * num2 * precision) / precision;
    default:
      return "Please input correct operator!";
  }
}

module.exports = { calculator };
