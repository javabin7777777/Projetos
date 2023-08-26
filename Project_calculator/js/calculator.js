"use strict";

/* Inicialização de variáveis */
const DECIMAL = 16;// Para precisão dos resultados.

// Para validação da string de entrada.
const algarism = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['*', '/', '+', '-'];
const special_O = ['(', '[', '{',];
const special_C = [')', ']', '}'];
const others = ['.', 'e', 'E'];
//const permit=[...algarism,...operator,...special_O,...special_C,...others];

const input = document.querySelector("#input");// Campo texto .
const div = document.querySelector("#containerButton");// div dos 'buttons'.
let aux = "";// Armazena o resultado da última operação.
let lastOperation = "";// Armazena a última operação.

// Usadas para mostrar os caracteres +,-,e,E,(,) .
let callCount0 = 0;
let callCount1 = 0;
let callCount2 = 0;

// Controla as operações raiz,porcentagem e potência.
let radix = false;// Para operação raiz de qualquer número.
let percentage = false;// Para operação porcentagem.
let power = false;// Usada pela operação potência de base(número) qualquer e expoente(número) qualquer.
let radical;// Usada para travar e destravar o 'button' raiz.

// Mensagens de avisos de erros.
let message0 = 'not a number';
let message1 = 'overload';
let message2 = 'there is no';

//Inicialização do campo texto.
input.value = "";

// Criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

// Criar os 'buttons' +,-,*,/,$,%,x²,pow,sqrt,root,Ln,Log,e,PI,sin,cos,tan,+-,E,(),.,',',CL,DEL,MR,LO,R,= .
let divNumber = div.innerHTML;
let X1 = `<button class="operator1">+</button><button class="operator1">-</button><button class="operator1">*</button><button class="operator1">/</button>`;

let X2 = `<button onclick="generic(\'real\')">R$</button><button onclick="generic(\'%\')">%</button><button  onclick="generic(\'pow2\')">x²</button><button onclick="generic(\'pow\')">x<sup>y</sup></button>`;

let X3 = `<button onclick="generic(\'squareRoot\')" title="Square Root"><img src="img/square-root-50.png" alt="square root icon "></button><button  id="root" onclick="generic(\'root\')" title="Root"><img src="img/square-root-50-N.png" alt="generic root icon "></button><button onclick="generic(\'ln\')">ln</button><button onclick="generic(\'log\')">log</button>`;

let X4 = `<button onclick="generic(\'euler\')" title="Euler Number">e</button><button onclick="generic(\'pi\')">PI</button><button onclick="generic(\'sin\')">sin</button><button onclick="generic(\'cos\')">cos</button>`;

let X5 = `<button onclick="generic(\'tan\')">tan</button><button  onclick="sign(\'+\',\'-\')">+-</button><button  onclick="signE()" title="Scientific Notation">E</button><button onclick="sign(\'(\',\')\')">( )</button>`;

let X6 = `<button class="operator1">.</button><button class="operator1">,</button><button  onclick="clearAll()" title="Clear">CL</button><button  onclick="delAll()">DEL</button>`;

let X7 = `<button onclick="memory()" title="Memory Read">MR</button><button onclick="lastOper()" title="Last Operation">LO</button><button  onclick="window.location.reload()" title="Reset">R</button><button id="equal" onclick=equalSign()>=</button>`;

div.innerHTML = `${divNumber}${X1}${X2}${X3}${X4}${X5}${X6}${X7}`;

radical = document.querySelector("#root");// Usada pelas funções root e clearAll.
const buttons = document.querySelectorAll('button');// Lista com todos 'buttons'.
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');
// Obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements, ...operators];

// Adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach((item) => {
    item.addEventListener('click', () => input.value += item.innerText);
});

// Executa a operação ao pressionar o 'button =' .
function equalSign() {
    if (input.value.length == 0) return false;
    let str = input.value;
    let number = 0;
    // Para operação raiz e potência,e outras operações.
    if (validation(str)) {
        str = str.replaceAll(',', '');
        if (percentage) { // Para operação porcentagem.
            str = eval(str);
            aux = aux / 100;
            lastOperation = aux + ' * ' + str;// Armazena a última operação.
            if (aux < 0 || str < 0) {
                messageError(message2);
                percentage = false;
                return false;
            }
            number = Number((eval(aux * str)).toFixed(DECIMAL));
            aux = number;// Armazena o último resultado.
            display(new String(number));
            percentage = false;
            return true;
        }

        // Para raiz de qualquer número,seja índice ou radicando(radix=true),a string de entrada será validada em separado.
        if (radix) { // Raiz de índice(número) qualquer e radicando(número) qualquer.Relacionado com a função root.
            let str1 = aux;// Radicando.
            let str2 = eval(str);// Índice.
            lastOperation = 'Filing= ' + str1 + 'Index= ' + str2;//Guarda para ser exibido como última operação.
            // Ínicio da validação das entradas str1 e str2.
            number = str2 - Math.trunc(str2);// Índice inteiro.
            let a = str1 > 0;// str1(radicando) poderá ser positivo ou negativo,conforme for str2(c).
            let b = str2 >= 2;// Somente índice maior ou igual a 2.
            let c = str2 % 2 == 0;// Quando for par,str1 deverá ser positivo,caso contrário,str1 pode ser positivo ou negativo.
            let d = number == 0;// str2 deverá ser inteiro.
            // Validação do radicando(str1) e do índice(str2).
            if (!((a && b && d) || (b && (!c) && d))) {
                messageError(message2);
                radix = false;
                return false;
            }
            // Término da validação das entradas str1 e str2.

            // Operação raiz de índice qualquer e radicando qualquer.
            if ((!a) && (!c)) {
                // Radicando negativo e índice ímpar.
                number = (-1) * (Number(((Math.abs(str1)) ** (1 / str2)).toFixed(DECIMAL)));
            } else {
                // Para outros casos.
                number = Number((str1 ** (1 / str2)).toFixed(DECIMAL));
            }
            aux = number; // Armazena o último resultado.
            display(new String(number));// Exibi o resultado da operação.
            radical.disabled = false;
            radical.style.background = "lightblue";
            radix = false;
            return true;
        }

        // Para operação potência de qualquer base(número) e qualquer expoente(número).
        if (power) {
            let str1 = aux;// Base.
            let str2 = eval(str);// Expoente.
            lastOperation = str1 + " ** " + str2;// Guarda para ser exibido como última operação.
            if (str1 < 0) {
                if (str2 % 2 != 0) number = (-1) * Number(eval(Math.abs(str1) + "**" + str2).toFixed(DECIMAL));// Base negativa e expoente ímpar.
                else number = Number(eval(Math.abs(str1) + "**" + str2).toFixed(DECIMAL));// Base negativa e expoente par.
            } else number = Number(eval(str1 + "**" + str2).toFixed(DECIMAL));  // Base positiva e expoente negativo ou positivo.
            aux = number; // Guarda o resultado da última operação na memória.
            // exibição do resultado da operação potência.
            if (number == Infinity) {
                messageError(message1);
            } else {
                display(new String(number));
            }
            power = false;
        } else { // Outras operações.
            lastOperation = str;// Guarda para ser exibido como última operação.
            number = Number(eval(str).toFixed(DECIMAL));
            aux = number; // Guarda o resultado da última operação na memória.
            // Exibição do resultado da operação.
            if (number == Infinity) {
                messageError(message1);
                aux = input.value;
            } else {
                display(new String(number));
            }

        }
    } else {
        lastOperation = str;// Armazena para ser exibido como última operação.
        messageError(message0);
        return false;
    }
}


// Fornece número de euler,valor de PI,seno,cosseno,tangente,logaritmo decimal,logaritmo neperiano,potência,raiz,raiz quadrada
// símbolo monetário do Real,porcentagem.
function generic(param) {
    let str = input.value;
    if (commaVerification(str)) {
        lastOperation = "Error: " + str;
        messageError(message0);
        return false;
    }
    switch (param) {
        case 'euler': input.value = Math.E; return true;

        case 'pi': input.value = Math.PI; return true;

        case 'real': let array = [...input.value];
            array.unshift('R$');
            input.value = array.join("");
            return true;

        case 'pow2':    // Potência de base 2 .
            if (validationPow(str)) { // validação da entrada .
                str = str.replaceAll(',', '');
                lastOperation = 'Base: ' + str;
                str = eval(str);
                let number = Number((str ** 2).toFixed(DECIMAL));
                if (number == Infinity) {
                    messageError(message1);
                    return false;
                } else {
                    aux = number;  // Armazena o último resultado.
                    display(new String(number));
                    return true;
                }
            } else {
                lastOperation = 'Error: ' + 'Base: ' + str;
                messageError(message0);
                return false;
            }
    }

    // Operação seno,cosseno,tangente,logaritmo decimal,logaritmo neperiano,raiz quadrada,porcentagem e potência.
    if (str.length != 0) {
        if (validation(str)) {
            str = str.replaceAll(',', '');
            str = eval(str);
            switch (param) {
                case 'sin': input.value = aux = angle(str, 'sin'); return true;

                case 'cos': input.value = aux = angle(str, 'cos'); return true;

                case 'tan': angle(str, 'tan'); return true;

                case 'squareRoot':  // Raiz quadrada.
                    lastOperation = "Filing: " + str;// Armazena a última operação(radicando).
                    if (str < 0) {
                        messageError(message2);
                        return false;
                    }
                    let number = Number(eval(str + '**(1/2)').toFixed(DECIMAL));
                    aux = number;// Armazena o último resultado.
                    display(new String(number));// Exibi o resultado da operação.
                    return true;

                case 'root':    // Raiz de índice qualquer e radicando qualquer.Relacionado com a função equalSign.
                    aux = str;
                    input.value = "";
                    radix = true;
                    //trava o 'button' raiz.
                    radical.style.background = "#867E7D";
                    radical.disabled = true;
                    return true;

                case '%':   // Porcentagem.
                    aux = str;
                    input.value = "";
                    percentage = true;
                    return true;

                case 'pow': // Potência de qualquer base e de qualquer expoente.Relacionado com a função equalSign.
                    aux = str;
                    input.value = "";
                    power = true;
                    return true;
            }
            if (str > 0) {
                switch (param) {
                    case 'log': input.value = aux = Number(Math.log10(str).toFixed(DECIMAL)); return true;
                    case 'ln': input.value = aux = Number(Math.log(str).toFixed(DECIMAL)); return true;
                }
            } else {
                lastOperation = "Logarithm: " + str;// Armazena a causa do erro.
                messageError(message2);
                return false;
            }
        } else {
            lastOperation = str;// Armazena a causa do erro.
            messageError(message0);
            percentage = false;
            radix = false;
            power = false;
            return false;
        }
    }

}

// Operação seno,cosseno e tangente.
function angle(str, value) {    
    str = Math.abs(Number(str));
    let num = str / 90 - Math.trunc(str / 90);
    let deg = (str * Math.PI) / 180;// Transforma para radianos.
    switch (value) {
        case 'sin': if (num === 0) {
            if ((str / 90) % 2 === 0) { // Se for par,o seno é zero.
                return 0;
            }
        }
            lastOperation = `sin(${deg} radians)`;
            return Math.sin(deg);

        case 'cos': if (num === 0) {
            if ((str / 90) % 2 !== 0) { // Se for ímpar,o cosseno é zero.
                return 0;
            }
        }
            lastOperation = `cos(${deg} radians) `;
            return Math.cos(deg);

        case 'tan': if (angle(str, 'cos') === 0) {
            messageError(message2);
        } else {
            input.value = aux = angle(str, 'sin') / angle(str, 'cos');
            lastOperation = `tan = sin: ${angle(str, 'sin')} / cos: ${angle(str, 'cos')} `;
        }
    }
}

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
                        if (!((algarism.includes(str[i + 1])) & (algarism.includes(str[i + 2])) & (algarism.includes(str[i + 3])))) return true;
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

// Validação da entrada,que é usada pela função pow2.
function validationPow(str) {
    // Se a String de entrada for vazia.
    if (str.length == 0) return false;

    // Verificar se o primeiro caracter é número ou '-'.
    if (!(algarism.includes(str[0]) || str[0] == '-')) {
        return false;
    }

    // Caracteres permitidos na String de entrada.
    const permitPow = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'e', 'E', '+', '.', ','];
    // Verificar cada caracter de entrada.
    for (let i of str) {
        if (!(permitPow.includes(i))) {
            return false;
        }
    }

    // Para caracter e ou E (notação científica).
    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'e' || str[i] == 'E') {
            let a = algarism.includes(str[i - 1]);
            let b = (algarism.includes(str[i + 1]) || permitPow.includes(str[i + 1]));
            if (!(a && b)) {
                return false;
            }
        }
    }
    return true;// Passou.
}

// Validar a string de entrada. // erro: não aceita começar com sinal de +
function validation(str) {
    // Ínício da verificação preliminar da string de entrada.
    if (str.length == 0) return false;// String vazia.
    if (commaVerification(str)) return false;
    str = str.replaceAll(',', '');
    // Verificação da string de entrada,se é somente número,seja ele positivo ou negativo.
    let number = true;
    /*
    let a=str.length>0;
    let b=str.length==1;
    let c=str[0] =='-' || str[0]=='+';
    if( a&&!b || a&&!c) {
        for(let i=0;i<str.length;i++) {
            if(c && i==0) continue;
            if(!algarism.includes(str[i])) {
                number=false;
                break;
            }
        }
    }else number=false;
    */

    for (let i = 0; i < str.length; i++) {
        if ((str[0] == '-' || str[0] == '+') & (i == 0)) continue;
        if (algarism.includes(str[i])) continue;
        else {
            number = false;
            break;
        }
    }
    if (number) return true;
    // Término da verificação da string de entrada,se é somente número.

    //contagem dos caracteres special_O e special_C.
    let counter_O = 0;// quantidade de caracteres special_O.
    let counter_C = 0;// quantidade de caracteres special_C.
    for (let i = 0; i < str.length; i++) {
        if (special_O.includes(str[i])) ++counter_O;
        else if (special_C.includes(str[i])) ++counter_C;
    }

    if (counter_O == counter_C) {
        let begin = str[0];
        let end = str[str.length - 1];
        let a = str.length > 2;
        let b = algarism.includes(begin) || special_O.includes(begin) || begin == '-';
        let c = algarism.includes(end) || special_C.includes(end) || begin == '+';
        let d; let e; let f; let g; let h; let j; let k; let before; let after;

        // String de entrada com tamanho maior que dois.
        // Iniciar com número ou um dos caracteres 'special_O','+',ou '-'.
        // Finalizar com número ou com um dos caracteres 'special_C'.
        if (!(a && b && c)) {
            return false;// 'String' de entrada não validada.
        }
        // Término da verificação preliminar da string de entrada .

        // Verificar se string de entrada está no formato numero+operator+numero ...
        // e com os caracteres special_O e special_C.
        // Percorre toda a string validando caracter por caracter.
        for (let i = 1; i < str.length; i++) {
            if (i != str.length - 1) {
                a = algarism.includes(str[i - 1]);
                b = operator.includes(str[i - 1]);
                c = special_O.includes(str[i - 1]);
                d = special_C.includes(str[i - 1]);
                j = others.includes(str[i - 1]);

                e = algarism.includes(str[i + 1]);
                f = operator.includes(str[i + 1]);
                g = special_O.includes(str[i + 1]);
                h = special_C.includes(str[i + 1]);
                k = others.includes(str[i + 1]);

                // Caso str[i] seja número:antecessor dele pode ser número,ou operador,ou caracter special aberto,ou caracteres others.
                // Caso str[i] seja número:sucessor dele pode ser número,ou operador,ou caracter special fechado,ou caracteres others.
                before = a || b || c || j; // Antecessor do caracters str[i];
                after = e || f || h || k; // Sucessor do caracter str[i];
                if (algarism.includes(str[i])) {
                    if (!(before && after)) return false;
                }

                // Caso str[i] seja operador: Antecessor dele pode ser número ou special fechado ou caracteres others.
                // Caso str[i] seja operador: Sucessor dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d || j;
                after = e || g;
                if (operator.includes(str[i])) {
                    if (!(before && after)) {
                        if (str[i + 1] == '*') i += 1; // Caso seja os caracteres '**'.
                        else return false;
                    }
                }

                // Caso str[i] seja um dos caracteres 'e' ou 'E'.
                // Antecessor deve ser número.
                // Sucessor deve ser número ou caracter '-'.
                before = a;
                after = e || str[i] == '-';
                if (str[i] == 'e' || str[i] == 'E') {
                    if (!(before && after)) return false;
                }

                // Caso str[i] seja caracter special_O:
                // Antecessor deve ser operador.
                // Sucessor deve ser número.
                before = b;
                after = e;
                if (special_O.includes(str[i])) {
                    if (!(before && after)) return false;
                }
                // Caso str[i] seja caracter special_C:
                // Antecessor pode ser número.
                // Sucessor pode ser operador.
                before = a;
                after = f;
                if (special_C.includes(str[i])) {
                    if (!(before && after)) return false;
                }
            } else {
                // último caracter da string de entrada.
                if (!(algarism.includes(str[i]) || special_C.includes(str[i]))) return false;
            }
        }
    } else return false;

    return true; // Passou.String de entrada validada.
}

// Mensagens de erros.
function messageError(message) {
    input.value = message.toUpperCase();
    aux = input.value;
    lock();
    return false;
}

// Desabilitar o campo texto(input) e os 'buttons',exceto 'button R','button MR' e 'button LO'.
function lock() {
    input.style.color = "red";
    input.style.fontweight = "bold";
    input.disabled = true;
    buttons.forEach((item) => {
        if (!(item.innerText == 'R' || item.innerText == 'MR' || item.innerText == 'LO')) item.disabled = true;
    });
}

function clearAll() {
    input.value = "";
    aux = "";
    lastOperation = "";
    callCount0 = 0;
    callCount1 = 0;
    callCount2 = 0;
    radix = false;
    power = false;
    percentage = false;
    radical.disabled = false;
    radical.style.background = "lightblue";
}

function delAll() {
    let array = [...input.value];
    array.pop();
    input.value = array.join('');
}

function memory() {
    input.value = aux;
}
function lastOper() {
    input.value = lastOperation;
}

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