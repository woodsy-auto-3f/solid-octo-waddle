const display = document.getElementById('display');

let currentInput = '0';
let firstValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendValue(value) {
  if (shouldResetDisplay) {
    currentInput = value === '.' ? '0.' : value;
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (value === '.' && currentInput.includes('.')) {
    return;
  }

  currentInput = currentInput === '0' && value !== '.' ? value : currentInput + value;
  updateDisplay();
}

function setOperator(nextOperator) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }

  firstValue = Number(currentInput);
  operator = nextOperator;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || firstValue === null) {
    return;
  }

  const secondValue = Number(currentInput);
  let result = 0;

  switch (operator) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case '*':
      result = firstValue * secondValue;
      break;
    case '/':
      result = secondValue === 0 ? 'Error' : firstValue / secondValue;
      break;
    default:
      return;
  }

  currentInput = String(result);
  firstValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearCalculator() {
  currentInput = '0';
  firstValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (currentInput.length <= 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }

  updateDisplay();
}

document.querySelectorAll('[data-value]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
    } else {
      appendValue(value);
    }
  });
});

document.querySelector('[data-action="calculate"]').addEventListener('click', calculate);
document.querySelector('[data-action="clear"]').addEventListener('click', clearCalculator);
document.querySelector('[data-action="delete"]').addEventListener('click', deleteLast);

updateDisplay();
