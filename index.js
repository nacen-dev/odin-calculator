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
  return firstNum / secondNum;
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
  return /[+-/*]/.test(value);
};

const isANumber = (value) => {
  return /\d/.test(value);
};

const addToDisplay = (value) => {
  console.log("value", value);
  console.log("display", displayValue);
  if (isAnOperator(value)) {
    if (firstNum && currentOperator && secondNum) {
      displayValue = operate(currentOperator, firstNum, secondNum);
      firstNum = displayValue;
      currentOperator = value;
      secondNum = displayValue;
    } else if (!currentOperator) {
      currentOperator = value;
      firstNum = displayValue;
    } else if (!secondNum) {
      secondNum = displayValue;
      displayValue = operate(currentOperator, firstNum, secondNum);
      firstNum = displayValue;
      secondNum = displayValue;
      currentOperator = value;
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
    } else displayValue += value;
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
    // console.log(evt.target.value)
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
