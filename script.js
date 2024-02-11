document.addEventListener('DOMContentLoaded', function() {
  const display = document.querySelector('.display');
  let firstOperand = '';
  let secondOperand = '';
  let operator = '';
  let decimalClicked = false;
  let divideByZeroCount = 0; 

  // Function to update the display
  function updateDisplay(value) {
    display.value = value;
  }

  // Function to handle decimal button click
  function handleDecimalClick() {
    if (!decimalClicked) {
      if (operator === '') {
        firstOperand += '.';
        updateDisplay(firstOperand);
      } else {
        secondOperand += '.';
        updateDisplay(secondOperand);
      }
      decimalClicked = true;
    }
  }

  // Function to handle number button clicks
  function handleNumberClick(event) {
    const number = event.target.textContent;
    if (operator === '') {
      firstOperand += number;
      updateDisplay(firstOperand);
    } else {
      secondOperand += number;
      updateDisplay(secondOperand);
    }
  }

  // Function to handle operator button clicks
  function handleOperatorClick(event) {
    operator = event.target.textContent;
    updateDisplay(operator);
    decimalClicked = false;
  }

  // Function to handle equals button click
  function handleEqualsClick() {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '-':
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case 'x':
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '÷':
        if (divideByZeroCount === 0) {
          updateDisplay('First Warning');
          divideByZeroCount++;
          return;
        }
        else if (divideByZeroCount == 1) {
          updateDisplay('Final Warning');
          divideByZeroCount++;
          return;
        }
        else if (divideByZeroCount >= 2) {
          window.location.href = 'https://en.wikipedia.org/wiki/Rule_34';
          return;
        }
        result = parseFloat(firstOperand) / parseFloat(secondOperand);
        break;
      default:
        return;
    }
    updateDisplay(result.toFixed(2));
    firstOperand = result.toString();
    secondOperand = '';
    operator = '';
    decimalClicked = false;
  }

  // Function to handle clear button click
  function handleClearClick() {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    updateDisplay('0');
  }

  // Attach event listeners to buttons
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', handleNumberClick);
  });

  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', handleOperatorClick);
  });

  document.querySelector('.decimal').addEventListener('click', handleDecimalClick);

  document.querySelector('.equals').addEventListener('click', handleEqualsClick);

  document.querySelector('.clear').addEventListener('click', handleClearClick);
});
