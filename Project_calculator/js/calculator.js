"use strict";

/* Inicialização de variáveis */

const DECIMAL=16;// para precisão dos resultados.

// Para validação da string de entrada.
const algarism=['0','1','2','3','4','5','6','7','8','9'];
const operator=['*','/','+','-'];
const special_O=['(','[','{',];
const special_C=[')',']','}'];
const others=['.','e','E'];
//const permit=[...algarism,...operator,...special_O,...special_C,...others];

const input = document.querySelector("#input");//campo texto .
const div= document.querySelector("#containerButton");// div dos 'buttons'.
let aux="";// Guarda resultado da última operação.
let lastOperation="";// Guarda a última operação.

// Usadas para mostrar os caracteres +/-,e/E,() de forma alternada.
let callCount0=0;
let callCount1=0;
let callCount2=0;

// Controla as operações raiz,porcentagem e potência.
let radix=false;// Para operação raiz de qualquer número.
let radical;//Usada para travar e destravar o 'button' raiz.
let percentage=false;// Para operação porcentagem.
let power=false;// Usada pela operação potência de base(número) qualquer e expoente(número) qualquer.

// Mensagens de avisos de erros.
let message0='not a number';
let message1='overload';
let message2='there is no';

//Iniciar o campo texto.
input.value="";

//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' +,-,*,/,$,%,x²,pow,sqrt,root,Ln,Log,e,PI,sin,cos,tan,+-,E,(),.,',',CL,DEL,MR,LO,R,= .
let divNumber=div.innerHTML;
let X1=`<button class="operator1">+</button><button class="operator1">-</button><button class="operator1">*</button><button class="operator1">/</button>`;

let X2=`<button onclick="generic(\'real\')">R$</button><button onclick="generic(\'%\')">%</button><button  onclick="generic(\'pow2\')">x²</button><button onclick="generic(\'pow\')">x<sup>y</sup></button>`;

let X3=`<button onclick="generic(\'squareRoot\')" title="Square Root"><img src="img/square-root-50.png" alt="square root icon "></button><button  id="root" onclick="generic(\'root\')" title="Root"><img src="img/square-root-50-N.png" alt="generic root icon "></button><button onclick="generic(\'ln\')">ln</button><button onclick="generic(\'log\')">log</button>`;

let X4=`<button onclick="generic(\'euler\')" title="Euler Number">e</button><button onclick="generic(\'pi\')">PI</button><button onclick="generic(\'sin\')">sin</button><button onclick="generic(\'cos\')">cos</button>`;

let X5=`<button onclick="generic(\'tan\')">tan</button><button  onclick="sign(\'+\',\'-\')">+-</button><button  onclick="signE()" title="Scientific Notation">E</button><button onclick="sign(\'(\',\')\')">( )</button>`;

let X6=`<button class="operator1">.</button><button class="operator1">,</button><button  onclick="clearAll()" title="Clear">CL</button><button  onclick="delAll()">DEL</button>`;

let X7=`<button onclick="memory()" title="Memory Read">MR</button><button onclick="lastOper()" title="Last Operation">LO</button><button  onclick="window.location.reload()" title="Reset">R</button><button onclick=equalSign()>=</button>`;

div.innerHTML=`${divNumber}${X1}${X2}${X3}${X4}${X5}${X6}${X7}`;

radical=document.querySelector("#root");// Usada pelas funções root e clearAll.
const buttons = document.querySelectorAll('button');// lista com todos 'buttons'.
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');
//obter os 'buttons' '+,-,*,/,., , ,()' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements,...operators];

//adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach( (item) => {
    item.addEventListener('click',() => input.value += item.innerText);
});

//Executa a operação ao pressionar o 'button =' .
function equalSign() {
       // console.log('input: '+input.value);
    let number;
    if(input.value.length==0) return false;

        // Para operação raiz,potência,porcentagem e outras operações.
   if(validation()) {
        if(percentage) { // Para operação porcentagem.
            let str=aux+input.value;
            let number=Number(eval(str).toFixed(DECIMAL));
            lastOperation=str;
            aux=number;// Para memory.
            display(new String(number));
            percentage=false;
            return true;
        }

        // Para raiz de qualquer número,seja índice ou radicando(radix=true),a string de entrada será validada em separado.
        if(radix) { // Raiz de índice(número) qualquer e radicando(número) qualquer.Relacionado com a função root.
            let str1=aux;// Radicando.
            let str2=input.value.replaceAll(',','');// Índice.

            // Ínicio da validação das entradas str1 e str2.
            let number=(Number(str2))-(Math.trunc(Number(str2)));// Índice inteiro.
            let a=Number(str1)>0;// str1(radicando) poderá ser positivo ou negativo,conforme for str2(c).
            let b=Number(str2)>=2;// Somente índice maior ou igual a 2.
            let c=Number(str2)%2==0;// Quando for par,str1 deverá ser positivo,caso contrário,str1 pode ser positivo ou negativo.
            let d=number==0;// str2 deverá ser inteiro.
            lastOperation='Filing= '+Number(str1).toFixed(4)+' Index= '+Number(str2).toFixed(4);// Última operação.
            if(!((a&&b&&d) || (b&&(!c)&&d))) {
                radix=false;
                messageError(message2);
                aux=input.value;
                return false;
            }
            // Término da validação das entradas str1 e str2.

            if((!a) && (!c)) {
                // Radicando negativo e índice ímpar.
                number=(-1)*(Number(((Math.abs(Number(str1)))**(1/Number(str2))).toFixed(DECIMAL)));
            }else {
                // Para outros casos.
                number=Number((Number(str1)**(1/(Number(str2)))).toFixed(DECIMAL));
            }
            aux=number; // Guarda na memória o último resultado.
            display(new String(number));// exibi o resultado da operação.
            radical.disabled=false;
            radical.style.background="lightblue";
            radix=false;
            return true;
        }

        /* Outras operações que não raiz. */

        // Para operação potência de qualquer base(número) e qualquer expoente(número).
        if(power) {
            lastOperation=aux+"**"+input.value;// Guarda para ser exibido como última operação.
            if(aux<0 & input.value%2!=0){
                number = (-1)*Number(eval(Math.abs(aux)+"**"+input.value).toFixed(DECIMAL));
            }else
                if(aux<0 & input.value%2==0) {
                    number =Number(eval(Math.abs(aux)+"**"+input.value).toFixed(DECIMAL));
                }else {
                    number = Number(eval(Math.abs(aux)+"**"+input.value).toFixed(DECIMAL));
                }
            aux=number; // Guarda o resultado da operação potência na memória.
            // exibição do resultado da operação potência.
            if (number==Infinity) {
                messageError(message1);
            }else {
                display(new String(number));
            }

        }else { // Para outras operações.
            number = Number(eval(input.value).toFixed(DECIMAL));
            aux=number; // Guarda o resultado da última operação na memória.
            lastOperation=input.value;// Guarda para ser exibido como última operação.

            // Exibição do resultado da operação.
            if (number==Infinity) {
                messageError(message1);
            }else {
                display(new String(number));
            }
        }
        power=false;

    }else {
        lastOperation=input.value;// Guarda para ser exibido como última operação.
        messageError(message0);
        aux=input.value;
        return false;
    }
}

    // Insere vírgula para separar os milhares.
function display(disPlay) {
    let arr=[];
    if(disPlay.includes('.')) {
        let a=disPlay.indexOf('.');
        for(let i=a;i>0;i-=3) {
            arr.unshift(disPlay.substring((i-3),i));
        }
        input.value=arr.join(',')+disPlay.substring(a,disPlay.length);
    }else {
         for(let i=disPlay.length;i>0;i-=3) {
            arr.unshift(disPlay.substring((i-3),i));
        }
        input.value=arr.join(',');
    }
}

// Validar a string de entrada.
function validation() {
        // Ínício da verificação preliminar da string de entrada.
   let str=input.value.replaceAll(',','');
           // console.log('str='+str);

    // Verificação da string de entrada,se é somente número,seja ele positivo ou negativo.
    let number=true;
    let a=str.length>0;
    let b=str.length==1;
    let c=str[0] == '-' || str[0]=='+';
    if( a&&!b || a&&!c) {
        for(let i=0;i<str.length;i++) {
            if(c && i==0) continue;
            if(!algarism.includes(str[i])) {
                number=false;
                break;
            }
        }
    }else number=false;

    if(number) return true;
    // Término da verificação da string de entrada,se é somente número.

    //contagem dos caracteres special_O e special_C.
    let counter_O=0;// quantidade de caracteres special_O.
    let counter_C=0;// quantidade de caracteres special_C.
    for(let i=0;i<str.length;i++) {
        if(special_O.includes(str[i])) ++counter_O;
        else  if(special_C.includes(str[i])) ++counter_C;
    }

    if(counter_O == counter_C) {
        let begin = str[0];
        let end = str[str.length-1];
        let a=str.length>2;
        let b=algarism.includes(begin) || special_O.includes(begin) || begin == '-';
        let c=algarism.includes(end) || special_C.includes(end) || begin=='+' ;
        let d;let e;let f;let g;let h;let j;let k;let before;let after;

        // String de entrada com tamanho maior que dois.
        // Iniciar com número ou um dos caracteres 'special_O','+',ou '-'.
        // Finalizar com número ou com um dos caracteres 'special_C'.
        if(!(a && b && c )) {
           return false;// 'String' de entrada não validada.
        }
        // Término da verificação preliminar da string de entrada .

        // Verificar se string de entrada está no formato numero+operator+numero ...
        // e com os caracteres special_O e special_C.
        // Percorre toda a string validando caracter por caracter.
        for(let i=1;i<str.length;i++) {
            if(i != str.length-1) {
                a=algarism.includes(str[i-1]);
                b=operator.includes(str[i-1]);
                c=special_O.includes(str[i-1]);
                d=special_C.includes(str[i-1]);
                j=others.includes(str[i-1]);

                e=algarism.includes(str[i+1]);
                f=operator.includes(str[i+1]);
                g=special_O.includes(str[i+1]);
                h=special_C.includes(str[i+1]);
                k=others.includes(str[i+1]);

                // Caso str[i] seja número:antecessor dele pode ser número,ou operador,ou caracter special aberto,ou caracteres others.
                // Caso str[i] seja número:sucessor dele pode ser número,ou operador,ou caracter special fechado,ou caracteres others.
                before = a || b || c || j; // Antecessor do caracters str[i];
                after =  e || f || h || k; // Sucessor do caracter str[i];
                if(algarism.includes(str[i])) {
                    if(!(before && after)) return false;
                }

                // Caso str[i] seja operador: Antecessor dele pode ser número ou special fechado ou caracteres others.
                // Caso str[i] seja operador: Sucessor dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d || j;
                after =  e || g;
                if(operator.includes(str[i])) {
                    if(!(before && after)) {
                        if(str[i+1]=='*') i+=1; // Caso seja os caracteres '**'.
                        else return false;
                    }
                }

                // Caso str[i] seja um dos caracteres 'e' ou 'E'.
                // Antecessor deve ser número.
                // Sucessor deve ser número ou caracter '-'.
                before =a;
                after = e || str[i]=='-' ;
                if(str[i]=='e' || str[i]=='E') {
                    if(!(before && after)) return false;
                }

                // Caso str[i] seja caracter special_O:
                // Antecessor deve ser operador.
                // Sucessor deve ser número.
                before =b;
                after =e;
                if(special_O.includes(str[i])) {
                    if(!(before && after)) return false;
                }
                // Caso str[i] seja caracter special_C:
                // Antecessor pode ser número.
                // Sucessor pode ser operador.
                before =  a ;
                after =  f;
                if(special_C.includes(str[i])) {
                    if(!(before && after)) return false;
                }
            }else {
                // último caracter da string de entrada.
                if(!(algarism.includes(str[i]) || special_C.includes(str[i]))) return false;
            }
        }
    } else return false;

    return [input.value=str,true]; // Passou.String de entrada validada.
}

// Validação da entrada,que é usada pela função pow2.
function validationPow() {
        // console.log(input.value);
    let str=input.value;
    const permitPow=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+'];
    if(str.length==0){
        messageError(message0);
        return false;
    }
    // Verificar cada caracter de entrada.
    for(let i of str) {
        if(!(permitPow.includes(i))) {
            return false;
        }
    }
    // Verificar se o primeiro caracter é número ou '-'.
    if(!(algarism.includes(str[0]) || str[0]=='-')) {
        return false;
    }
    // Para caracter e ou E (notação científica).
    for(let i=0;i<str.length;i++) {
        if(str[i] == 'e' || str[i] == 'E') {
            let a=algarism.includes(str[i-1]);
            let b=(algarism.includes(str[i+1]) || permitPow.includes(str[i+1]));
            if(!(a && b)) {
                return false;
            }
        }
    }
    return true;// Passou.
  }


// Fornece número de euler,valor de PI,seno,cosseno,tangente,logaritmo decimal,logaritmo neperiano,potência,raiz,raiz quadrada
// símbolo monetário do Real,porcentagem.
function generic(param) {
   // console.log(param);
    let str=input.value.replaceAll(',','');
    switch(param) {
        case 'euler': input.value=Math.E; return true;

        case 'pi': input.value=Math.PI; return true;

        case 'real':    let array=[...input.value];
                        array.unshift('R$');
                        input.value=array.join("");
                        return true;

        case '%':   if(input.value.length==0) return false;
                    if(validation()) {
                        aux=str+'*0.01*';
                        input.value="";
                        percentage=true;
                        return true;
                    }else {
                        lastOperation=input.value;// Guarda na memória a causa do erro.
                        percentage=false;
                        messageError(message0);
                        aux=input.value;
                        return false;
                    }

        case 'pow': // Potência de qualquer base e de qualquer expoente.Relacionado com a função equalSign.
                    if(input.value.length==0) return false;
                    aux=Number(str);
                    input.value="";
                    power=true;return true;

        case 'root':    // Raiz de índice qualquer e radicando qualquer.Relacionado com a função equalSign.
                        if(input.value.length==0) return false;
                        aux=str;
                        input.value="";
                        radix=true;
                        //trava o 'button' raiz.
                        radical.style.background="#867E7D";
                        radical.disabled=true;return true;

        case 'pow2':    // Potência de base 2 .
                        if(input.value.length==0) return false;
                        if(validationPow()) { // validação da entrada .
                            let number=Number((Number(str)**2).toFixed(DECIMAL));
                            if (number==Infinity) {
                                messageError(message1);
                                lastOperation=input.value;
                                return false;
                            }else {
                                aux=number;  // Guarda na memória o último resultado.
                                display(new String(number));
                                return true;
                            }
                        }else {
                            lastOperation="Error: "+input.value;
                            messageError(message0);
                            aux=input.value;
                            return false;
                        }
    }

    // Operação seno,cosseno,tangente,logaritmo decimal,logaritmo neperiano e raiz quadrada.
    if(validation()) {
        if(input.value.length!=0) {
            switch(param) {
                case 'sin': input.value=aux=Number( Math.sin((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );return true;
                case 'cos': input.value=aux=Number( Math.cos((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );return true;
                case 'tan': let a= Number( Math.sin((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );
                            let b= Number( Math.cos((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );
                            input.value=Number((a/b).toFixed(DECIMAL));
                            return true;
                case 'squareRoot':  // Raiz quadrada.
                                    lastOperation="Filing: "+str;// Guarda na memória a última operação(radicando).
                                    if(Number(str) < 0) {
                                        messageError(message2);
                                        aux=input.value;
                                        return false;
                                    }
                                    let number = Number((Number(str)**(1/2)).toFixed(DECIMAL));
                                    aux=number;// Guarda na memória o último resultado.
                                    display(new String(number));// Exibi o resultado da operação.
                                    return true;
            }
            if(Number(str)>0) {
                switch(param) {
                    case 'log':input.value=aux=Number(Number(Math.log10(Number(str))).toFixed(DECIMAL));return true;
                    case 'ln' :input.value=aux=Number(Number(Math.log(Number(str))).toFixed(DECIMAL));return true;
                }
            }else {
                lastOperation="Logarithm: "+input.value;// Guarda na memória a causa do erro.
                messageError(message2);
                aux=input.value;
                return false;
            }
        }else return false;

    }else {
        lastOperation=input.value;// Guarda na memória a causa do erro.
        messageError(message0);
        aux=input.value;
        return false;
    }
}

// Mensagens de erros.
function messageError(message) {
    input.value=message.toUpperCase();
    lock();
    return false;
}

// Desabilitar o campo texto(input) e os 'buttons',exceto 'button R','button MR' e 'button LO'.
function lock() {
    input.style.color = "red";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=> {
        if(!(item.innerText == 'R' || item.innerText == 'MR' || item.innerText== 'LO')) item.disabled= true;
    });
}

function clearAll() {
    input.value="";
    aux="";
    lastOperation="";
    callCount0=0;
    callCount1=0;
    callCount2=0;
    radix=false;
    power=false;
    percentage=false;
    radical.disabled=false;
    radical.style.background="lightblue";
}

function delAll() {
    let array=[...input.value];
    array.pop();
    input.value=array.join('');
}

function memory() {
    input.value=aux;
}
function lastOper() {
    input.value=lastOperation;
}

// Alternância entre os sinais: '+' e '-'.
// Alternância entre os sinais: '(' e ')'.
function sign(A,B) {
    //console.log('input= '+input.value);
    let arr=[...input.value];
    //console.log(arr);
    switch(A) {
        case '+':   if(arr.length!=0) {
                        if(arr.includes(A) || arr.includes(B)) {
                            if(callCount0%2==0) {
                                arr.shift();
                                arr.unshift(A);
                                input.value=arr.join('');
                            }
                            else {
                                arr.shift();
                                arr.unshift(B)
                                input.value=arr.join('');
                            }

                        }else {
                            if(callCount0%2==0) input.value=A+input.value;
                            else  input.value=B+input.value;
                        }

                    }else {
                        if(callCount0%2==0) input.value=A+input.value;
                        else input.value=B+input.value;
                    }
                    ++callCount0;
                    break;

        case '(':  if(callCount2%2==0) {
                        arr.unshift(A);
                        input.value=arr.join('');
                    }else {
                        arr.push(B);
                        input.value=arr.join('');
                    }
                    ++callCount2;
    }
}

// Alternância entre os caracteres :'e','E'(notação científica).
function signE() {
    let arr=[...input.value];
    if(arr.length!=0) {
        if(arr.includes('e') || arr.includes('E')) {
            if(callCount1%2==0) {
                 arr.pop();
                 arr.push('e');
                 input.value=arr.join('');
             }
             else {
                 arr.pop();
                 arr.push('E')
                 input.value=arr.join('');
             }

        }else {
            if(callCount1%2==0) {
               input.value=input.value+'e';
            }
            else {
               input.value=input.value+'E';
            }
        }
        ++callCount1;
    }
 }