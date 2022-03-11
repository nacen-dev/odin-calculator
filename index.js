let firstNum = null;
let secondNum = null;
let currentOperator = null;
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

const backspace = (displayValue) => {
  displayValue = displayValue.slice(0, -1);
  displayValue = displayValue.length === 0 ? "0" : displayValue;
  return displayValue;
};

const addToDisplay = (input) => {
  if (isAnOperator(input)) {
    if (firstNum !== null && currentOperator && secondNum !== null) {
      displayValue = operate(currentOperator, firstNum, secondNum).toString();

      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;
      result = Number(displayValue);

      currentOperator = input;
      firstNum = result;
      secondNum = null;
    } else if (!currentOperator) {
      if (firstNum === null) {
        firstNum = Number(displayValue);
      }
      currentOperator = input;
    } else if (
      (firstNum !== null || result !== null) &&
      secondNum === null &&
      currentOperator
    ) {
      console.log(`first num has a value, secondNum is empty`);
      if (input === currentOperator) {
        let operatingInput = result !== null ? result : firstNum;
        displayValue = operate(
          currentOperator,
          operatingInput,
          operatingInput
        ).toString();
        displayValue = checkIfLongDecimal(displayValue)
          ? decimalFormat(displayValue).toString()
          : displayValue;
        result = Number(displayValue);
        firstNum = null;
        currentOperator = input;
      } else {
        currentOperator = input;
      }
    } else if (result !== null && currentOperator && secondNum !== null) {
      displayValue = operate(currentOperator, result, secondNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;
      result = Number(displayValue);
      currentOperator = input;
      secondNum = null;
    }
  } else if (input === "=" || input === "Enter") {
    if (firstNum !== null && currentOperator && secondNum !== null) {
      displayValue = operate(currentOperator, firstNum, secondNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;
      currentOperator = null;
      result = Number(displayValue);
      firstNum = null;
      secondNum = null;
    } else if (firstNum !== null && currentOperator && secondNum === null) {
      displayValue = operate(currentOperator, firstNum, firstNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;
      currentOperator = null;
      firstNum = null;
      secondNum = null;
      result = Number(displayValue);
    } else if (
      firstNum === null &&
      result !== null &&
      currentOperator &&
      secondNum
    ) {
      displayValue = operate(currentOperator, result, secondNum).toString();
      displayValue = checkIfLongDecimal(displayValue)
        ? decimalFormat(displayValue).toString()
        : displayValue;
      currentOperator = null;
      result = Number(displayValue);
      secondNum = null;
    }
  } else if (input === ".") {
    if (displayValue.includes(".")) return;
    displayValue += input;
  } else if (isANumber(input)) {
    console.log("input is a number");
    if (displayValue === "0") {
      displayValue = input;
      result = null;
      if (firstNum === null) {
        firstNum = Number(input);
      } else {
        secondNum = Number(input);
      }
    } else if (result !== null) {
      if (!currentOperator) {
        displayValue = input;

        firstNum = Number(displayValue);
        result = null;
      } else if (currentOperator) {
        if (secondNum !== null) {
          displayValue += input;
        } else if (secondNum === null) {
          displayValue = input;
        }
        secondNum = Number(displayValue);
      }
    } else if (firstNum !== null && currentOperator && secondNum === null) {
      displayValue = input;
      secondNum = Number(displayValue);
    } else if (!currentOperator) {
      if (result !== null) {
        displayValue = input;
        firstNum = Number(displayValue);
      } else if (result === null) {
        displayValue += input;
        firstNum = Number(displayValue);
      }
    } else if (firstNum !== null && currentOperator && secondNum) {
      displayValue += input;
      secondNum = Number(displayValue);
    }
  } else if (input === "Backspace") {
    if (firstNum !== null && !currentOperator && secondNum === null) {
      displayValue = backspace(displayValue);
      firstNum = Number(displayValue);
    } else if (firstNum !== null && secondNum !== null) {
      displayValue = backspace(displayValue);
      secondNum = Number(displayValue);
    } else if (firstNum === null && secondNum === null && result !== null) {
      displayValue = backspace(displayValue);
      result = Number(displayValue);
    }
  }
};

const clear = () => {
  firstNum = null;
  secondNum = null;
  currentOperator = "";
  displayValue = "0";
  display.textContent = displayValue;
  result = null;
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
    case "Enter":
      addToDisplay(event.key);
      display.textContent = displayValue;
      break;
    default:
      break;
  }
});
