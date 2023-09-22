import { radical, buttons } from "./calculator.js";
import { generic } from "./gen.js";

const obj = {
    lastOperation: '',  // Armazena a última operação.
    aux: '',    // Armazena o resultado da última operação.
    // Controla as operações raiz,porcentagem e potência.
    radix: false,   // Para operação raiz de qualquer número.
    power: false,   // Usada pela operação potência de base(número) qualquer e expoente(número) qualquer.
    percentage: false,  // Para operação porcentagem.
    // Mensagens de avisos de erros.
    message0: 'not a number',
    message1: 'overload',
    message2: 'there is no',
    // Para validação da string de entrada.
    algarism: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    operator: ['*', '/', '+', '-'],
    special_O: ['(', '[', '{',],
    special_C: [')', ']', '}'],
    others: ['.', 'e', 'E'],
    // Caracteres permitidos na String de entrada.Usado na função pow2
    permitPow: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'e', 'E', '+', '.', ','],
    DECIMAL: 16// Para precisão dos resultados.
}

export default obj;

// Verificar se as vírgulas separam os milhares corretamente.
function commaVerification(str) {
    if (str.indexOf(',') > 0) { // Determina se existe vírgula.
        if (str[0] != 0) {
            if ((str.indexOf(',') + 3) > str.length) {
                return true;
            }
            for (let i = 0; i < str.length; i++) {
                if (str[i] === ',') {
                    if ((i + 3) < str.length) {
                        if (!((obj.algarism.includes(str[i + 1])) & (obj.algarism.includes(str[i + 2])) & (obj.algarism.includes(str[i + 3])))) return true;
                        else i += 3;
                    } else return true;
                } else {
                    if (str[i] == '.') return false;
                    else {
                        if ((str.length - 1) == i) return true;
                    }
                }
            }
            return false;// Passou.
        } else return true;
    } return false;
}

// Insere vírgula para separar os milhares.
function display(result) {
    if (result.includes('e') || result.includes('E')) {
        input.value = result;
        return true;
    }
    let arr = [];
    if (result.includes('.')) {
        let a = result.indexOf('.');
        for (let i = a; i > 0; i -= 3) {
            arr.unshift(result.substring((i - 3), i));
        }
        input.value = arr.join(',') + result.substring(a, result.length);
    } else {
        for (let i = result.length; i > 0; i -= 3) {
            arr.unshift(result.substring((i - 3), i));
        }
        input.value = arr.join(',');
    }
}

// Mensagens de erros.
function messageError(message) {
    input.value = message.toUpperCase();
    obj.aux = input.value;
    lock();
    return false;
}

// Desabilitar o campo texto(input) e os 'buttons',exceto 'button R','button MR' e 'button LO'.
function lock() {
    input.style.color = "red";
    input.style.fontweight = "bold";
    input.disabled = true;
    buttons.forEach((item) => {
        if (!(item.innerText.includes('R') || item.innerText.includes('MR') || item.innerText.includes('LO')))
            item.disabled = true;
    });
}

function clearAll() {
    input.value = "";
    obj.aux = "";
    obj.lastOperation = "";
    obj.radix = false;
    obj.power = false;
    obj.percentage = false;
    callCount0 = 0;
    callCount1 = 0;
    callCount2 = 0;
    radical.disabled = false;
    radical.style.background = "lightblue";
}

function delAll() {
    let array = [...input.value];
    array.pop();
    input.value = array.join('');
}

function memory() {
    input.value = obj.aux;
}
function lastOper() {
    input.value = obj.lastOperation;
}

// Usadas para mostrar os caracteres +,-,e,E,(,) .
let callCount0 = 0;
let callCount1 = 0;
let callCount2 = 0;

// Alternância entre os sinais: '+' e '-'.
// Alternância entre os sinais: '(' e ')'.
function sign(A, B) {
    //console.log('input= '+input.value);
    let arr = [...input.value];
    //console.log(arr);
    switch (A) {
        case '+': if (arr.length != 0) {
            if (arr.includes(A) || arr.includes(B)) {
                if (callCount0 % 2 == 0) {
                    arr.shift();
                    arr.unshift(A);
                    input.value = arr.join('');
                }
                else {
                    arr.shift();
                    arr.unshift(B)
                    input.value = arr.join('');
                }

            } else {
                if (callCount0 % 2 == 0) input.value = A + input.value;
                else input.value = B + input.value;
            }

        } else {
            if (callCount0 % 2 == 0) input.value = A + input.value;
            else input.value = B + input.value;
        }
            ++callCount0;
            break;

        case '(': if (callCount2 % 2 == 0) {
            arr.unshift(A);
            input.value = arr.join('');
        } else {
            arr.push(B);
            input.value = arr.join('');
        }
            ++callCount2;
    }
}

// Alternância entre os caracteres :'e','E'.
function signE() {
    let arr = [...input.value];
    if (arr.length != 0) {
        if (arr.includes('e') || arr.includes('E')) {
            if (callCount1 % 2 == 0) {
                arr.pop();
                arr.push('e');
                input.value = arr.join('');
            }
            else {
                arr.pop();
                arr.push('E')
                input.value = arr.join('');
            }

        } else {
            if (callCount1 % 2 == 0) {
                input.value = input.value + 'e';
            }
            else {
                input.value = input.value + 'E';
            }
        }
        ++callCount1;
    }
}

function eventsButtons() {
    document.getElementById('clear').addEventListener('click', () => clearAll());
    document.getElementById('del').addEventListener('click', () => delAll());
    document.getElementById('tan').addEventListener('click', () => generic('tan'));
    document.getElementById('cos').addEventListener('click', () => generic('cos'));
    document.getElementById('sen').addEventListener('click', () => generic('sin'));
    document.getElementById('pow2').addEventListener('click', () => generic('pow2'));
    document.getElementById('pi').addEventListener('click', () => generic('pi'));
    document.getElementById('euler').addEventListener('click', () => generic('euler'));
    document.getElementById('clearText').addEventListener('click', () => generic('ctt'));
    document.getElementById('inverse').addEventListener('click', () => generic('inv'));
    document.getElementById('root').addEventListener('click', () => generic('root'));
    document.getElementById('squareRoot').addEventListener('click', () => generic('squareRoot'));
    document.getElementById('percentage').addEventListener('click', () => generic('%'));
    document.getElementById('real').addEventListener('click', () => generic('real'));
    document.getElementById('pow').addEventListener('click', () => generic('pow'));

    document.getElementById('sign').addEventListener('click', () => sign('+', '-'));
    document.getElementById('parenthesis').addEventListener('click', () => sign('(', ')'));
    document.getElementById('signE').addEventListener('click', () => signE());
    document.getElementById('memory').addEventListener('click', () => memory());
    document.getElementById('lastOper').addEventListener('click', () => lastOper());



}

export { signE, sign, lastOper, memory, lock, messageError, display, commaVerification, eventsButtons };