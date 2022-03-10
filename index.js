let firstNum = null;
let secondNum = null;
let currentOperator = "";
let displayValue = "0";
let result = null;

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

const decimalFormat = (number, numOfDecimal = 2) => {
  return (
    Math.round(number * Math.pow(10, numOfDecimal)) / Math.pow(10, numOfDecimal)
  );
};

const checkIfLongDecimal = (number) => {
  return number % 1 != 0
    ? number.toString().match(/(?<=)\d+/g)[1].length >= 4
    : false;
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

const isAnOperator = (input) => {
  return /\/|\+|-|\*/.test(input);
};

const isANumber = (input) => {
  return /\d/.test(input);
};

const addToDisplay = (input) => {
  if (isAnOperator(input)) {
    if (firstNum !== null && currentOperator && secondNum !== null) {
      displayValue = operate(currentOperator, firstNum, secondNum).toString();

      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;

      currentOperator = input;
      firstNum = Number(displayValue);
      secondNum = null;
    } else if (!currentOperator) {
      console.log("no operator yet");
      currentOperator = input;
      firstNum = Number(displayValue);
    } else if (firstNum !== null && secondNum === null && currentOperator) {
      if (input === currentOperator) {
        displayValue = operate(currentOperator, firstNum, firstNum).toString();
        displayValue = checkIfLongDecimal(displayValue)
          ? decimalFormat(displayValue).toString()
          : displayValue;

        firstNum = Number(displayValue);
        // currentOperator = "";
      } else {
        currentOperator = input;
      }
    }
  } else if (input === "=") {
    if (firstNum !== null && currentOperator && secondNum !== null) {
      displayValue = operate(currentOperator, firstNum, secondNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;

      firstNum = Number(displayValue);
      secondNum = null;
    } else if (firstNum !== null && currentOperator && secondNum === null) {
      displayValue = operate(currentOperator, firstNum, firstNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;

      firstNum = Number(displayValue);
      secondNum = null;
    }
  } else if (input === ".") {
    if (displayValue.includes(".")) return;
    displayValue += input;
  } else if (isANumber(input)) {
    console.log("input is a number");
    if (displayValue === "0") {
      displayValue = input;
      if (firstNum === null) {
        firstNum = Number(input);
      } else {
        secondNum = Number(input);
      }
    } else if (firstNum !== null && currentOperator && secondNum === null) {
      displayValue = input;
      secondNum = Number(displayValue);
    } else if (!currentOperator) {
      displayValue += input;
      firstNum = Number(displayValue);
    } else if (firstNum !== null && currentOperator && secondNum) {
      displayValue += input;
      secondNum = Number(displayValue);
    }
  } else if (input === "Backspace") {
    currentOperator = "";
    if (firstNum && !secondNum) {
      displayValue = displayValue.slice(0, -1);
      displayValue = displayValue.length === 0 ? "0" : displayValue;
      firstNum = Number(displayValue);
    } else if (firstNum !== null && secondNum !== null) {
      displayValue = displayValue.slice(0, -1);
      displayValue = displayValue.length === 0 ? "0" : displayValue;
      secondNum = Number(displayValue);
    }
  }
};

const clear = () => {
  firstNum = null;
  secondNum = null;
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
  calculatorButton.addEventListener("click", (event) => {
    addToDisplay(event.target.value);
    display.textContent = displayValue;
  });
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "c":
    case "C":
      clear();
      break;
    case "+":
    case "-":
    case "/":
    case "*":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
    case "=":
    case "Backspace":
      addToDisplay(event.key);
      display.textContent = displayValue;
      break;
    default:
      break;
  }
});
