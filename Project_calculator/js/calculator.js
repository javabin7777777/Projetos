"use strict";
/*Calculator*/
/* Inicialização de variáveis */
const DECIMAL = 16; para precisão dos resultados.
 para validação da string de entrada.
const algarism = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['*', '/', '+', '-'];
const special_O = ['(', '[', '{',];
const special_C = [')', ']', '}'];
const others = ['.', 'e', 'E'];
const permit = [...algarism, ...operator, ...special_O, ...special_C, ...others];
const input = document.querySelector("#input");campo texto.
const div = document.querySelector("#containerButton"); div dos 'buttons'.
let aux = ""; usada pela memory.
 usadas para mostrar os caracteres +, -, e, E, (,) de forma alternada.
let callCount0 = 0;
let callCount1 = 0;
let callCount2 = 0;
controla as operações raiz e a porcentagem.
let radix = false; Para operação raiz de qualquer número.
let percentage = false; Para operação porcentagem.
let radical;usada para travar e destravar o 'button' raiz.
let power = false; Usada pela operação potência de base(número) qualquer e expoente(número) qualquer.
mensagens de avisos de erros.
let message0 = 'not a number';
let message1 = 'overload';
let message2 = 'there is no';
input.value = "";

criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,', ',(),MR,CL,DEL,R,='.
    div.innerHTML = div.innerHTML + '<button class="operator1" >' + '+' + '</button>' + '<button class="operator1">' + '-' + '</button>';

div.innerHTML = div.innerHTML + '<button class="operator1">' + '*' + '</button>' + '<button class="operator1">' + '/' + '</button>' +
    '<button onclick="generic(\'real\')">' + 'R$' + '</button>' + '<button onclick="generic(\'%\')">' + '%' + '</button>';

div.innerHTML = div.innerHTML + '<button  onclick="pow2()">' + 'x²' + '</button>' + '<button onclick="pow()">' + 'x<sup>y</sup>' + '</button>';

div.innerHTML = div.innerHTML + '<button onclick="squareRoot()">' + '<img src="img/square-root-50.png" alt="square root icon ">';
div.innerHTML = div.innerHTML + '</button>' + '<button  id="root" onclick="root()">' + '<img src="img/square-root-50-N.png" alt="generic root icon ">' + '</button>';
div.innerHTML = div.innerHTML + '<button    onclick="generic(\'ln\')">' + 'ln' + '</button>' + '<button onclick="generic(\'log\')">' + 'log' + '</button>';
div.innerHTML = div.innerHTML + '<button onclick="generic(\'euler\')">' + 'e' + '</button>' + '<button onclick="generic(\'pi\')">' + 'PI' + '</button>';
div.innerHTML = div.innerHTML + '<button onclick="generic(\'sin\')">' + 'sin' + '</button>' + '<button onclick="generic(\'cos\')">' + 'cos' + '</button>' +
    '<button onclick="generic(\'tan\')">' + 'tan' + '</button>';

div.innerHTML = div.innerHTML + '<button  onclick="sign(\'+\',\'-\')">' + '+/-' + '</button>';
div.innerHTML = div.innerHTML + '<button  onclick="signE()">' + 'E' + '</button>';
div.innerHTML = div.innerHTML + '<button onclick="sign(\'(\',\')\')">' + '( )' + '</button>';

div.innerHTML = div.innerHTML + '<button class="operator1">' + '.' + '</button>' + '<button class="operator1">' + ',' + '</button>';

div.innerHTML = div.innerHTML + '<button  onclick="clearAll()">' + 'CL' + '</button>' + '<button  onclick="delAll()">' + 'DEL' + '</button>';

div.innerHTML = div.innerHTML + '<button onclick="memory()">' + 'MR' + '</button>' +
    '<button  onclick="window.location.reload()">' + 'R' + '</button>' + '<button onclick=equalSign()>' + '=' + '</button>';

radical = document.querySelector("#root"); Usada pelas funções root e clearAll.

const buttons = document.querySelectorAll('button');
obter os 'buttons' de 0 a 9 e insere na lista elements.
const elements = document.querySelectorAll('.number'); 'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators.
const operators = document.querySelectorAll('.operator1');
const combined = [...elements, ...operators];

adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach((item) => {
    item.addEventListener('click', () => {
        array.push(item.innerText);
        input.value = input.value + item.innerText;
    });
});

Executa a operação ao pressionar o 'button ='.
function equalSign() {
    if (input.value.length == 0) return false;
    Para operação raiz e outras operações que não raiz.
        if(validation()) {
        if (percentage) {  Para operação porcentagem.
            let str = aux + input.value;

            let number = Number(eval(str).toFixed(DECIMAL));
            aux = number; Para memory.
                display(new String(number));
            percentage = false;
            return true;
        }
         Para raiz de qualquer número(radix = true),a string de entrada será validada em separado.
            if(radix) {  Raiz de índice(número) qualquer e de um radicando(número) qualquer.Relacionado com a função root.
            let str1 = aux; Radicando.
            let str2 = input.value; Índice.
            Ínicio da validação das entradas str1 e str2.
            let number = (Number(str2)) - (Math.trunc(Number(str2))); Índice inteiro.
            let a = Number(str1) > 0; str1(radicando) poderá ser positivo ou negativo, conforme for str2(c).
            let b = Number(str2) >= 2; Somente índice maior ou igual a 2.
            let c = Number(str2) % 2 == 0; Quando for par, str1 deverá ser positivo, caso contrário, str1 pode ser positivo ou negativo.
            let d = number == 0; str2 deverá ser inteiro.
                if(!((a && b && d) || (b && (!c) && d))) {
                aux = 'Filing= ' + str1 + ' Index= ' + str2; Para memory.
                    radix = false;
                messageError(message2);
                return false;
            }
             Término da validação das entradas str1 e str2.
            Operação raiz de índice qualquer e radicando qualquer.
                if((!a) && (!c)) {
                 Radicando negativo e índice ímpar.
                    number = (-1) * (Number(((Math.abs(Number(str1))) ** (1 / Number(str2))).toFixed(DECIMAL)));
                display(new String(number));
            }else {
                 Para outros casos.
                    number = Number((Number(str1) ** (1 / (Number(str2)))).toFixed(DECIMAL));
                display(new String(number));
            }
            aux = number;  Para memory.
                radical.disabled = false;
            radical.style.background = "lightblue";
            radix = false;
            return true;
        }
        input.value = aux + input.value;
         Outras operações que não raiz.
            if(power) { Para operação potência de qualquer base(número) e qualquer expoente(número).
                input.value = aux + input.value;
            power = false;
        }
        let number = Number(eval(input.value).toFixed(DECIMAL));
        aux = number;  para memory.
            if(number == Infinity) {
            messageError(message1);;
            return false;
        }else {
            display(new String(number));
            return true;
        }

    }else {
        aux = input.value; Para 'memory'.
            messageError(message0);
        return false;
    }
}
 Insere vírgula para separar os milhares.
function display(disPlay) {
    let arr = [];

    if (disPlay.includes('.')) {
        let a = disPlay.indexOf('.');

        for (let i = a; i > 0; i -= 3) {
            arr.unshift(disPlay.substring((i - 3), i));
        }

        input.value = arr.join(',') + disPlay.substring(a, disPlay.length);

    } else {
        for (let i = disPlay.length; i > 0; i -= 3) {
            arr.unshift(disPlay.substring((i - 3), i));
        }

        input.value = arr.join(',');

    }
}

 Validar a string de entrada.
function validation() {       
     Ínício da verificação preliminar da string de entrada.
        if(Number(input.value) == 0) return true;
    let str = input.value.replaceAll(',', '');
            
          Verificação da string de entrada, se é somente número positivo ou negativo.
    let number = true;
    let a = str.length > 0;
    let b = str.length == 1;
    let c = str[0] == '-' || str[0] == '+';
    if (a && !b || a && !c) {
        for (let i = 0; i < str.length; i++) {
            if (c && i == 0) continue;
            if (!algarism.includes(str[i])) {
                number = false;
                break;
            }
        }
    } else number = false;
    if (number) return true;
    Término da verificação da string de entrada,se é somente número positivo ou negativo.    
    contagem dos caracteres special_O e special_C.
    let counter_O = 0; quantidade de caracteres special_O.
    let counter_C = 0; quantidade de caracteres special_C.
        for(let i = 0; i < str.length; i++) {
        if (special_O.includes(str[i])) ++counter_O;
        else if (special_C.includes(str[i])) ++counter_C;
         verifica se a string de entrada é somente número positivo ou negativo.         
    }
    if (counter_O == counter_C) {
        let begin = str[0];
        let end = str[str.length - 1];
        let a = str.length > 2;
        let b = algarism.includes(begin) || special_O.includes(begin) || begin == '-';
        let c = algarism.includes(end) || special_C.includes(end) || begin == '+';
        let d; let e; let f; let g; let h; let j; let k; let before; let after;
         String de entrada com tamanho maior que dois.
         Iniciar com número ou um dos caracteres 'special_O', ou '+', ou '-'.
         Finalizar com número ou com um dos caracteres 'special_C'.
            if(!(a && b && c)) {
            return false;
        }
         Término da verificação preliminar da string de entrada.  

         Verificar se string de entrada está no formato numero + operator + numero ... 
         e com os caracteres special_O e special_C.
            for(let i = 1; i < str.length; i++) {   percorre toda a string validando caracter por caracter.
                if(i != str.length - 1) {
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

                 Caso str[i] seja número:antecessor dele pode ser número, ou operador, ou caracter special aberto, ou caracteres others.
                 Caso str[i] seja número:sucessor dele pode ser número, ou operador, ou caracter special fechado, ou caracteres others.
                    before = a || b || c || j;  antecessor do caracters str[i];
                after = e || f || h || k;  sucessor do caracter str[i];

                if (algarism.includes(str[i])) {


                    if (!(before && after)) return false;

                }

                 Caso str[i] seja operador: antecessor dele pode ser número ou special fechado ou caracteres others.
                 Caso str[i] seja operador: sucessor dele pode ser número ou special aberto, exceto para o operador '**'.
                    before = a || d || j;
                after = e || g;
                if (operator.includes(str[i])) {


                    if (!(before && after)) {
                        if (str[i + 1] == '*') i += 1;Caso seja os caracteres '**'.
                        else return false;

                    }
                }
                 Caso str[i] seja um dos caracteres 'e' ou 'E'.
                  antecessor deve ser número.
                  sucessor deve ser número ou caracter '-'.
                    before = a;
                after = e || str[i] == '-';
                if (str[i] == 'e' || str[i] == 'E') {
                    if (!(before && after)) return false;
                }
                 Caso str[i] seja caracter special_O: antes dele pode ser operador e depois pode ser número.
                    before = b;
                after = e;
                if (special_O.includes(str[i])) {
                    if (!(before && after)) return false;
                }
                 Caso str[i] seja caracter special_C: antes dele pode ser número e depois pode ser operador.
                    before = a;
                after = f;
                if (special_C.includes(str[i])) {
                    if (!(before && after)) return false;
                }
            }else {
                 último caracter da string de entrada.
                    if(!(algarism.includes(str[i]) || special_C.includes(str[i]))) return false;
            }
        }
    } else return false;

    return [input.value = str, true]; passou
}

 Validação da entrada, que é usada pela função pow2.
function validationPow() {

    let str = input.value;
    const permitPow = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-', 'e', 'E', '+'];
    if (str.length == 0) {
        messageError(message0);
        return false;
    }  
     verificar se cada caracter de entrada.
        for(let i of str) {
        if (!(permitPow.includes(i))) {

            return false;
        }
    }
     verificar se o primeiro caracter é número ou '-'.
        if(!(algarism.includes(str[0]) || str[0] == '-')) {
        return false;
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'e' || str[i] == 'E') {
            let a = algarism.includes(str[i - 1]);
            let b = (algarism.includes(str[i + 1]) || permitPow.includes(str[i + 1]));


            if (!(a && b)) {
                return false;
            }
        }
    }
    return true; passou
}

 Potência de base 2 .
function pow2() {
    if (input.value.length == 0) return false;
    let str = input.value;
    if (validationPow()) {  validação da entrada.
        let number = Number((Number(str) ** 2).toFixed(DECIMAL));
        if (number == Infinity) {
            messageError(message1);
            return false;
        } else {
            aux = number;   Para 'memory'.
                display(new String(number));
            return true;
        }
    } else {
        messageError(message0);
        return false;
    }
}

 Potência de qualquer base e de qualquer expoente.
function pow() {
    if (input.value.length == 0) return false;
    aux = input.value + '**';
    input.value = "";
    power = true;
}

 Raiz quadrada.
function squareRoot() {
    if (input.value.length == 0) return false;
    let str = input.value;
    aux = str; para 'memory'.
        if(validation()) {  validação da entrada.
            if(Number(str) < 0) {
            aux = str; para 'memory'.
                messageError(message2);
            return false;
        }
        let number = Number((Number(str) ** (1 / 2)).toFixed(DECIMAL));
        aux = number; Para 'memory'.
            display(new String(number));
        return true;
    }else {
        messageError(message0);
        return false;
    }
}

 Raiz de índice qualquer e radicando qualquer.Relacionado com a função equalSign.
function root() {
    if (input.value.length == 0) return false;
    aux = input.value;
    input.value = "";
    radix = true;
    trava o 'button' raiz.
        radical.style.background = "#867E7D";
    radical.disabled = true;
}
 Fornece número de euler, valor de PI, seno, cosseno, tangente, logaritmo decimal, logaritmo neperiano,
    símbolo monetário do Real, porcentagem.
function generic(param) {

        if (input.value.length == 0) return false;
        switch (param) {
            case 'euler': input.value = Math.E; return true;

            case 'pi': input.value = Math.PI; return true;

            case 'real': let array = [...input.value];
                array.unshift('R$');
                input.value = array.join("");
                return true;

            case '%':
                if (validation()) {
                    aux = input.value + '*0.01*';
                    input.value = "";
                    percentage = true;

                    return true;
                } else {
                    aux = input.value; Para 'memory'.
                        percentage = false;
                    messageError(message0);
                    return false;
                }
        }

        if (validation()) {
            if (input.value.length != 0) {
                let str = input.value;
                switch (param) {
                    case 'sin': input.value = aux = Number(Math.sin((Math.abs(Number(str)) * Math.PI) / 180).toFixed(DECIMAL)); return true;
                    case 'cos': input.value = aux = Number(Math.cos((Math.abs(Number(str)) * Math.PI) / 180).toFixed(DECIMAL)); return true;
                    case 'tan': let a = Number(Math.sin((Math.abs(Number(str)) * Math.PI) / 180).toFixed(DECIMAL));
                        let b = Number(Math.cos((Math.abs(Number(str)) * Math.PI) / 180).toFixed(DECIMAL));
                        input.value = Number((a / b).toFixed(DECIMAL));
                        return true;
                }
                if (Number(str) > 0) {
                    switch (param) {
                        case 'log': input.value = aux = Number(Number(Math.log10(Number(str))).toFixed(DECIMAL)); return true;
                        case 'ln': input.value = aux = Number(Number(Math.log(Number(str))).toFixed(DECIMAL)); return true;
                    }

                } else {
                    aux = input.value; Para 'memory'.
                        messageError(message2);
                    return false;
                }
            } else return false;

        } else {
            aux = input.value; Para 'memory'.
                messageError(message0);
            return false;
        }
    }

 Mensagens de erros.
function messageError(message) {
    input.value = message.toUpperCase();
    lock();
    return false;
}

Desabilitar o campo texto(input) e os 'buttons', exceto 'button R' e 'button MR'.
function lock() {
    input.style.color = "red";
    input.style.fontweight = "bold";
    input.disabled = true;
    buttons.forEach((item) => {

        if (!(item.innerText == 'R' || item.innerText == 'MR')) item.disabled = true;

    });
}

function clearAll() {
    input.value = "";
    aux = "";
    callCount0 = 0;
    callCount1 = 0;
    callCount2 = 0;
    radix = false;
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
Alternância entre os sinais '+' e  '-'.
Alternância entre os sinais '(' e ')'.
function sign(A, B) {
    let arr = [...input.value];
    switch (A) {
        case '+':
            if (arr.length != 0) {
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
        break;
    }
}

 Alternância entre os caracteres: 'e', 'E'.
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
