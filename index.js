let firstNum = 0;
let secondNum = 0;
let currentOperator = "";
let displayValue = "0";

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const subtract = (firstNum, secondNum) => {
  return firstNum - secondNum;
};

const multiply = (firstNum, secondNum) => {
  return firstNum * secondNum;
};

const divide = (firstNum, secondNum) => {
  if (secondNum === 0) {
    alert("Unable to divide by 0");
    return 0;
  }
  return firstNum / secondNum;
};

const decimalFormat = (num = 0, numOfDecimal = 2) => {
  return (
    Math.round(num * Math.pow(10, numOfDecimal)) / Math.pow(10, numOfDecimal)
  );
};

const operate = (operator, firstNum, secondNum) => {
  if (operator === "+") {
    return add(Number(firstNum), Number(secondNum));
  } else if (operator === "-") {
    return subtract(Number(firstNum), Number(secondNum));
  } else if (operator === "/") {
    return divide(Number(firstNum), Number(secondNum));
  } else if (operator === "*") {
    return multiply(Number(firstNum), Number(secondNum));
  }
  return;
};

const isAnOperator = (value) => {
  return /\/|\+|-|\*/.test(value);
};

const isANumber = (value) => {
  return /\d/.test(value);
};

const addToDisplay = (value) => {
  if (isAnOperator(value)) {
    if (firstNum && currentOperator && secondNum) {
      displayValue = operate(currentOperator, firstNum, secondNum);
      currentOperator = value;
      firstNum = displayValue;
      secondNum = 0;
    } else if (!currentOperator) {
      currentOperator = value;
      firstNum = displayValue;
    } else if (!secondNum && currentOperator) {
      displayValue = operate(currentOperator, firstNum, firstNum);
      firstNum = displayValue;
      currentOperator = "";
    } else {
    }
  } else if (value === "=") {
    if (firstNum && currentOperator && secondNum) {
      displayValue = operate(currentOperator, firstNum, secondNum);
      firstNum = displayValue;
      secondNum = 0;
      currentOperator = "";
    }
  } else if (value === ".") {
    if (displayValue.includes(".")) return;
    else {
      displayValue += value;
    }
  } else if (isANumber(value)) {
    if (displayValue === "0") {
      displayValue = value;
    } else if (firstNum && currentOperator && !secondNum) {
      displayValue = value;
      secondNum = displayValue;
    } else {
      displayValue += value;
      if (!firstNum || !currentOperator) firstNum = displayValue;
      else if (firstNum && currentOperator) secondNum = displayValue;
    }
  }
};

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  currentOperator = "";
  displayValue = "0";
  display.textContent = displayValue;
};

const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
const calculatorButtons = document.querySelectorAll(".calculator-button");

display.textContent = displayValue;

clearButton.addEventListener("click", clear);
calculatorButtons.forEach((calculatorButton) => {
  calculatorButton.addEventListener("click", (evt) => {
    addToDisplay(evt.target.value);
    display.textContent = displayValue;
  });
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "c":
    case "C":
      clear();
      return;
    default:
      return;
  }
});
