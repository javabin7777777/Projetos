import { radical, buttons } from "./main.js";
import generic from "./gen.js";
import equalSign from "./equal.js";

//const permit=[...algarism,...operator,...special_O,...special_C,...others];

const obj = {
    lastOperation: '',  // Armazenar a última operação.
    aux: '',    // Armazenar o resultado da última operação.

    // Controlar as operações raiz,porcentagem e potência.
    selectionOperation: '', // a ser definida.
    radix: false,   // Para operação raiz de qualquer número.
    power: false,   // Para operação potência de base(número) qualquer e expoente(número) qualquer.
    percentage: false,  // Para operação percentagem.
    modulo: false,  // Para operação modulo(obtém o resto da operacao divisao inteira).

    // Mensagens de avisos.
    message0: 'não é possível',//'not a number',
    message1: 'sobrecarga', //'overload',
    message2: 'não existe', //'there is no',

    // Para validação da 'string' de entrada,por validate.js .
    algarism: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    operator: ['*', '/', '+', '-'],
    special_O: ['(', '[', '{'],
    special_C: [')', ']', '}'],
    others: ['.', 'e', 'E'],

    // Caracteres permitidos na 'string' de entrada.A função pow2 faz uso disso.
    permitPow: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'e', 'E', '+', '.', ','],

    DECIMAL: 16  // Precisão dos resultados.
}

function Clear(str) {
    str = str.replaceAll('R$', '');
    str = str.replaceAll('º', '');
    str = str.replaceAll('rad', '');
    str = str.replaceAll('%', '');
    str = str.replaceAll('!', '');
    return str;
}

// Verificar divisão por zero.
function verificarOperacaoDivisaoPOrZero(str) {   
    if (str.includes('/')) {
        for (let i = 0; i < str.length; i++) {           
            if (str[i] === '/') {
                if (Number(str[i + 1]) === Number(0)) {
                    if (Number(i + 1) === Number(str.length - 1)) return messageError(obj.message0);
                    else {
                        if (str[i + 2] === '.' ) {
                            if(Number(i + 2) === Number(str.length - 1)) return messageError(obj.message0);
                            else continue;
                        } else return  messageError(obj.message0); 
                    }
                } else continue;
            }
        } 
    }   
    return true;
}

    // Verificar se o numero é octal(inicia com zero).
    function verificarOctal(str) {
        let array = [];
        // Captura os operadores.
        for (let i = 0; i < str.length; i++) {
            if (obj.operator.includes(str[i])) array.push(i);
        }

        // verificar se existe numero octal.
        if (str.length > 1) {
            if (array.length !== 0) {
                let verificar = false;
                let subStr = str.substring(0, array[0]);
                if (!(subStr.includes('.'))) {
                    if (Number(str[0]) === 0) return true;
                }
                for (let i = 0; i < array.length; i++) {
                    if ((Number(str[array[i] + 1]) === 0) & !(array[i] + 1 === str.length - 1)) {
                        if (!(str[array[i] + 2] === '.')) {
                            verificar = true;
                            break;
                        }
                    }
                }
                if (verificar) return true;
                else return false;

            } else {
                if (!(str.includes('.'))) {
                    if (Number(str[0]) === 0) return true;
                }
            }

        } else return false;
    }


    function fatorial(str) {
        obj.lastOperation = str + '!';// Armazena a ultima operacao.
        if (Number(str) === 0 | Number(str) === 1) {
            input.value = obj.aux = 1;
            return true;
        }
        let x = str - Math.trunc(str);
        if (str < 0 || x !== 0) {  // Numeros negativos e numeros que nao sao inteiros.
            messageError(obj.message2);
            return false;
        }

        x = str;
        for (let i = 1; i < str; i++) x = x * (str - i);
        if (x === Infinity) messageError(obj.message1);
        else input.value = obj.aux = x;
    }

    //Verificar se as virgulas separam os milhares corretamente.
    function commaVerification(str) {

        if (str.indexOf(',') > 0) { // Determina se existe vírgula,e caso exista,não poderá ser o primeiro caracter da 'string'.
            let array1 = [...str];
            let array2 = array1.filter((elemento) => elemento === ',');
            let contaVirgula = 0;
            if (str[0] !== 0) {
                if ((str.indexOf(',') + 3) > str.length) {
                    return true;
                }
                for (let i = 0; i < str.length; i++) {

                    if (array2.length !== contaVirgula) {

                        if (str[i] === ',') {
                            if ((i + 3) < str.length) {
                                if (!((obj.algarism.includes(str[i + 1])) & (obj.algarism.includes(str[i + 2])) & (obj.algarism.includes(str[i + 3])))) return true;
                                else {
                                    i += 3;
                                    contaVirgula += 1;
                                }

                            } else return true;

                        } else {
                            if (str[i] === '.') return false;
                            else {
                                if ((str.length - 1) === i) return true;
                            }
                        }

                    } else break;
                }
                return false;// Passou.
            } else return true;
        }
        return false;
    }

    // Mostra o resultado da operação,e,introduz virgula e o ponto caso seja necessario .
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

    // Mensagens de erros .
    function messageError(message) {
        input.value = obj.aux = message.toUpperCase();
        lock();
        return false;
    }

    // Desabilitar o campo texto(input) e os 'buttons',exceto 'button R','button MR' e 'button LO' .
    function lock() {
        input.style.color = "red";
        input.style.fontweight = "bold";
        input.disabled = true;
        buttons.forEach((item) => {
            if (!(item.innerText.includes('R') || item.innerText.includes('MR') || item.innerText.includes('LO')))
                item.disabled = true;
        });
    }

    // Deletar todo campo texto e resetar variaveis.
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
        callCount3 = 0;
        radical.disabled = false;
        radical.style.background = "lightblue";
    }

    // Deletar caracter por caracter
    function delAll() {
        let array = [...input.value];
        array.pop();
        input.value = array.join('');
    }

    // Resultado da última operacao.
    function memory() {
        input.value = obj.aux;
    }
    // Ultima operacao.
    function lastOper() {
        input.value = obj.lastOperation;
    }

    // Converter graus para radianos.
    function radiano(str) {
        callCount3 += 1;
        if (callCount3 % 2 !== 0) {

            obj.aux = str + 'º'; // Valor em grau.               
            input.value = ((Math.PI * str) / 180) + 'rad'; // Valor em radianos.       

        } else {

            input.value = obj.aux;

        }
    }

    // Usadas para mostrar os caracteres -> +,-,e,E,(,) <- . 
    let callCount0 = 0; // funcao sign
    let callCount1 = 0; // funcao signE
    let callCount2 = 0; // funcao sign
    let callCount3 = 0; // funcao radiano

    // Alternância entre os sinais: '+' e '-'.
    // Alternância entre os sinais: '(' e ')'.
    function sign(A, B) {

        let arr = [...input.value];
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

    // Alternância entre os caracteres 'e' e 'E' para notacao cientifica.
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

    // Criar os eventos para os 'buttons'.
    const array = ['tan', 'cos', 'sin', 'pow2', 'pi', 'euler', 'clearText', 'inv', 'root', 'squareRoot',
        '%', 'real', 'pow', 'ln', 'log', 'fatorial', 'abs', 'mod', 'rad'];

    function eventsButtons() {

        // Adicionar eventos ao 'buttons' .
        for (let str of array) {
            document.getElementById(str).addEventListener('click', () => generic(str));
        }

        // Adicionar evento ao 'button =' .
        document.getElementById('equal').addEventListener('click', () => equalSign());

        // Adicionar eventos aos outros 'buttons' .
        document.getElementById('clear').addEventListener('click', () => clearAll());
        document.getElementById('del').addEventListener('click', () => delAll());
        document.getElementById('sign').addEventListener('click', () => sign('+', '-'));
        document.getElementById('parenthesis').addEventListener('click', () => sign('(', ')'));
        document.getElementById('signE').addEventListener('click', () => signE());
        document.getElementById('memory').addEventListener('click', () => memory());
        document.getElementById('lastOper').addEventListener('click', () => lastOper());
    }

    export default obj;
    export {
        signE, sign, lastOper, memory, lock, messageError, display,
        commaVerification, eventsButtons, fatorial, radiano, verificarOctal, Clear, verificarOperacaoDivisaoPOrZero
    };