let display = document.getElementById("display");
let currentExpression = "";

let appendToDisplay = (value) => {
  currentExpression += value;
  display.value = currentExpression;
};

let clearDisplay = () => {
  currentExpression = "";
  display.value = "";
};

let deleteLastEntry = () => {
  currentExpression = currentExpression.slice(0, -1);
  display.value = currentExpression;
};

let calculate = () => {
  try {
    let result = evaluateExpression(currentExpression);
    display.value = result;
    currentExpression = result;
  } catch (error) {
    display.value = "Error";
    currentExpression = "";
  }
};

function evaluateExpression(expression) {
  let operators = [];
  let operands = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const tokens = expression.match(/\d+(\.\d+)?|[+\-*/]/g);

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      operands.push(parseFloat(token));
    } else if (token in precedence) {
      while (
        operators.length > 0 &&
        precedence[token] <= precedence[operators[operators.length - 1]]
      ) {
        applyOperation(operators.pop(), operands);
      }
      operators.push(token);
    }
  });
  if (operands.length !== operators.length + 1) {
    throw new Error("Invalid expression");
  }
  while (operators.length > 0) {
    applyOperation(operators.pop(), operands);
  }

  return operands[0];
}

function applyOperation(operator, operands) {
  const b = operands.pop();
  const a = operands.pop();

  if (operator === "/" && b === 0) {
    throw new Error("Division by Zero");
  }

  switch (operator) {
    case "+":
      operands.push(a + b);
      break;
    case "-":
      operands.push(a - b);
      break;
    case "*":
      operands.push(a * b);
      break;
    case "/":
      operands.push(a / b);
      break;
  }
}
