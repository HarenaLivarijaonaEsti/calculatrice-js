const scientificPanel = document.querySelector('.scientific-panel');
const toggleButton = document.getElementById('toggle-scientific');

toggleButton.addEventListener('click', () => {
    scientificPanel.classList.toggle('open');
    toggleButton.textContent = scientificPanel.classList.contains('open') ? ' <<' : ' Sc.'; 
});

document.querySelectorAll('.sci').forEach(btn => {
    btn.addEventListener('click', () => {
        const func = btn.dataset.func;
        applyScientificFunction(func);
    });
});

function applyScientificFunction(func) {
    let value = parseFloat(currentInput || previousInput);
    if (isNaN(value)) return;

    let result;
    switch (func) {
        case 'sqrt': result = Math.sqrt(value); break;
        case 'square': result = value * value; break;
        case 'sin': result = Math.sin(value); break;
        case 'cos': result = Math.cos(value); break;
        case 'tan': result = Math.tan(value); break;
        case 'log': result = Math.log10(value); break;
        case 'ln': result = Math.log(value); break;
        case 'exp': result = Math.exp(value); break;
    }

    currentInput = Number.isFinite(result) ? result.toFixed(6).replace(/\.?0+$/, '') : 'Erreur';
    previousInput = '';
    operator = null;
    resetNext = true;
    updateDisplay();
}





