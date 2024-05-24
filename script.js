// Seleciona o elemento de display
const display = document.getElementById('display');

// Variáveis para armazenar valores e operadores
let valorDisplay = '0';
let primeiroOperando = null;
let segundoOperando = false;
let operador = null;

// Atualiza o display com o valor atual
function atualizarDisplay() {
    display.innerText = valorDisplay;
}

// Limpa o display e redefine todas as variáveis
function limparDisplay() {
    valorDisplay = '0';
    primeiroOperando = null;
    segundoOperando = false;
    operador = null;
    atualizarDisplay();
}

// Adiciona um número ao display
function adicionarNumero(numero) {
    if (segundoOperando) {
        valorDisplay = numero.toString();
        segundoOperando = false;
    } else {
        valorDisplay = valorDisplay === '0' ? numero.toString() : valorDisplay + numero;
    }
    atualizarDisplay();
}

// Adiciona um ponto decimal ao display
function adicionarPonto() {
    if (!valorDisplay.includes('.')) {
        valorDisplay += '.';
    }
    atualizarDisplay();
}

// Adiciona um operador e prepara para o próximo número
function adicionarOperador(proximoOperador) {
    const valorInput = parseFloat(valorDisplay);

    if (operador && segundoOperando) {
        operador = proximoOperador;
        return;
    }

    if (primeiroOperando === null && !isNaN(valorInput)) {
        primeiroOperando = valorInput;
    } else if (operador) {
        const resultado = realizarCalculo(primeiroOperando, valorInput, operador);
        valorDisplay = `${parseFloat(resultado.toFixed(7))}`;
        primeiroOperando = resultado;
    }

    segundoOperando = true;
    operador = proximoOperador;
    atualizarDisplay();
}

// Realiza o cálculo com base no operador
function realizarCalculo(primeiro, segundo, operador) {
    switch (operador) {
        case '+':
            return primeiro + segundo;
        case '-':
            return primeiro - segundo;
        case '*':
            return primeiro * segundo;
        case '/':
            return primeiro / segundo;
        case '%':
            return primeiro % segundo;
        default:
            return segundo;
    }
}

// Calcula o resultado final quando o botão "=" é pressionado
function calcular() {
    const valorInput = parseFloat(valorDisplay);

    if (operador && !segundoOperando) {
        const resultado = realizarCalculo(primeiroOperando, valorInput, operador);
        valorDisplay = `${parseFloat(resultado.toFixed(7))}`;
        primeiroOperando = null;
        operador = null;
        segundoOperando = false;
        atualizarDisplay();
    }
}
