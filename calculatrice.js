const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn')

let currentInput = '';
let previousInput = '';
let operator = null;
let resetNext = false;

buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const value = btn.textContent;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
        updateDisplay();
    })
;});

function handleNumber(num) {
    if (resetNext) {
        currentInput = '';
        resetNext = false;
    }

    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
}

function handleOperator(op) {
    switch (op) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (currentInput === '' && previousInput === '') return;
            if (previousInput && currentInput) calculate();
            operator = op;
            previousInput = currentInput;
            currentInput = '';
            break;
        case '=':
            if (!previousInput || !currentInput) return;
            calculate();
            operator = null;
            break;
        case 'C':
            clearAll();
            break;
        case '←':
            currentInput = currentInput.slice(0, -1);
            break;
    }
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Erreur !! \nDivision par zéro' : prev / current;
            break;
    }
    currentInput = Number.isFinite(result) ? result.toFixed(9).replace(/\.?0+$/, '') : result.toString();
    previousInput = '';
    operator = null;
    resetNext = true;
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
}

function updateDisplay() {
  let value = currentInput || previousInput || '0';

  // Si ce n’est pas un nombre, on affiche tel quel (ex: "Erreur")
  if (isNaN(value)) {
    display.textContent = value;
    return;
  }

  // Convertir en nombre
  let num = parseFloat(value);

  // S’il dépasse 12 chiffres significatifs, on passe en notation scientifique
  if (num.toString().replace('.', '').length > 12) {
    value = num.toExponential(6); // exemple : "2.000000e+12"
  } else {
    // Sinon, on garde une forme normale avec 12 chiffres max
    value = num.toPrecision(12).replace(/\.?0+$/, '');
  }

  display.textContent = value;
}

