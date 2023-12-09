function superCalc(num1, num2, operator, precision) {
  let prec = 1;
  if (precision <= 0){
    return "Precision shows how many integers will have your number after the dot. Use an integer more than 0 and less than 8."
  } else{
    prec = Math.pow(10, precision);
  }
  
  switch (operator) {
    case "+":
      return Math.round((num1 + num2) * prec) / prec;
    case "-":
      return Math.round((num1 - num2) * prec) / prec;
    case "/":
      return Math.round((num1 / num2) * prec) / prec;
    case "*":
      return Math.round(num1 * num2 * prec) / prec;
    default:
      return "Please input correct operator!";
  }

}

module.exports = { superCalc };
