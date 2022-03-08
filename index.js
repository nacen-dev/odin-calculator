let firstNum = 0;
let secondNum = 0;
let currentOperator = "";
let displayValue = 10;


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
    return add(firstNum, secondNum);
  } else if (operator === "-") {
    return subtract(firstNum, secondNum);
  } else if (operator === "/") {
    return divide(firstNum, secondNum);
  } else if (operator === "*") {
    return multiply(firstNum, secondNum);
  }
};

const addToDisplay = (display, value) => {};

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  currentOperator = "";
  displayValue = 0;
  display.textContent = displayValue;
};

const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");


display.textContent = displayValue;

clearButton.addEventListener("click", clear)

document.addEventListener("keydown", (event) => {
  console.log(event)
  switch(event.key) {
    case "c":
    case "C":
      clear();
      return;
    default:
      return;
  }
})