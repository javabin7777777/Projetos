"use strict";

/* inicialização de variáveis */
const DECIMAL=10;
const algarism=['0','1','2','3','4','5','6','7','8','9'];
const operator=['*','/','+','-'];    
const special_O=['(','[','{',];
const special_C=[')',']','}'];
const others=['.','e','E'];
const permit=[...algarism,...operator,...special_O,...special_C,'.','e','E'];
const input = document.querySelector("#input");//campo texto .
const div= document.querySelector("#containerButton");// div dos 'buttons'.
let aux="";
let callCount=0;
let callCount1=0;
let callCount2=0;
let radix=false;
let radical;
input.value="";

//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,(,),=,CL,DEL,R'.
div.innerHTML = div.innerHTML+'<button class="operator1" >'+'+'+'</button>'+'<button class="operator1">'+'-'+'</button>';
div.innerHTML = div.innerHTML + '<button class="operator1">'+'*'+'</button>'+'<button class="operator1">'+'/'+'</button>'+
'<button>'+'%'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="pow2()">'+'x²'+'</button>'+'<button onclick="pow()">'+'x<sup>y</sup>'+'</button>';
div.innerHTML = div.innerHTML +'<button onclick="squareRoot()">'+'<img src="img/square-root-50.png" alt="square root icon ">'+
'</button>'+'<button  id="root" onclick="root()">'+'<img src="img/square-root-50-N.png" alt="generic root icon ">'+'</button>'+
'<button    onclick="let logaritmo=false;log(logaritmo)">'+'ln'+'</button>'+
'<button onclick="let logaritmo=true;log(logaritmo)">'+'log'+'</button>'+'<button onclick="Euler()">'+'e'+'</button>'+
'</button>'+'<button onclick="PI()">'+'PI'+'</button>'+'<button onclick="let angle=true;sincos(angle)">'+'sin'+'</button>'+
'<button onclick="let angle=false;sincos(angle)">'+'cos'+'</button>'+'<button>'+'tan'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="signMinus()">'+'+/-'+'</button>'+
'<button  onclick=signE()>'+'E'+'</button>';
div.innerHTML = div.innerHTML +'<button class="operator1">'+'.'+'</button>'+'<button onclick="signBrackets()">'+'( )'+'</button>'+
'<button onclick=equalSign()>'+'='+'</button>'+'<button  onclick="clearAll()">'+'CL'+'</button>'+
'<button  onclick="delAll()">'+'DEL'+'</button>'+'<button onclick="memory()">'+'MR'+'</button>'+
'<button  onclick="window.location.reload()">'+'R'+'</button>';

const buttons = document.querySelectorAll('button');
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');//'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
//obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements,...operators];

//adicionar eventos aos 'buttons' de 0 a 9 e aos 'buttons' '+,-,*,/,.,(,)' .
combined.forEach( (item) => {
    item.addEventListener('click',() => {
        input.value = input.value + item.innerText;
    });
});

//executa a operação ao pressionar o 'button =' .
function equalSign() {       
    if(validation() || radix) { // para deixar passar o segundo valor(str2),que é o índice,quando for negativo.Na validação será filtrado. 
        
        if(radix) { // raiz de índice(número) qualquer de um radicando(número) qualquer.Relacionado com a função root.
            input.value=aux+input.value;//string que será validada,em seguida calculada a raiz a partir dela.
            let str2="";// índice.
            let str1="";// radicando.
            for (let index = 0; index < input.value.length; index++) {// obter os dois valores(índice e radicando) da string de entrada.
                if(input.value[index]=='*' && input.value[index+1]=='*') {
                    str1=input.value.substring(0,index);
                    str2=input.value.substring(index+2,input.value.length);
                    break;                                                                            
                }               
            }

            // validação da string de entrada.
            let number=(Number(str2))-(Math.trunc(Number(str2)));
            let a=Number(str1)>0;// str1(radicando) poderá ser positivo ou negativo,conforme for str2(c).
            let b=Number(str2)>=2;// somente índice maior ou igual a 2.
            let c=Number(str2)%2==0;// quando for par str1 deverá ser positivo,caso contrário,str1 pode ser positivo ou negativo.
            let d=number==0;// str2 deverá ser inteiro.
            if(!((a&&b&&d) || (b&&(!c)&&d))) { 
                aux=input.value;// para memory.
                input.value='there is no'.toUpperCase();               
                lock();
                return false;
            }

            if((!a) && (!c)) input.value=(-1)*( Number( ( (Math.abs(Number(str1)))**(1/Number(str2)) ).toFixed(DECIMAL) ) );// radicando negativo e índice ímpar.                              
            else input.value=Number( ( Number(str1)**(1/(Number(str2))) ).toFixed(DECIMAL) );// para outros casos. 
            aux=input.value; // para memory. 
            radical.disabled=false;  
            radical.style.background="lightblue";       
            radix=false;
            return;
        }

        // outras operações que não raiz.       
        let number = Number(eval(input.value).toFixed(DECIMAL));
        aux=number; // para memory.
        if (number==Infinity) {
            input.value = 'OverLoad'.toUpperCase();
            lock();
            return false;       
        }else {
            input.value = number;           
            return true;        
        }
        
    }else {
        aux=input.value;// para memory
        nAn();
    }    
}

// validar a string de entrada.
function validation() { 
   // console.log(typeof(input.value));
   // início da verificação preliminar da string de entrada .
   // console.log(input.value);
    let counter_O=0;
    let counter_C=0;
    let number=true;
    //contagem dos caracteres special_O e special_C.
    for(let i=0;i<input.value.length;i++) {
        if(special_O.includes(input.value[i])) ++counter_O;    
        else  if(special_C.includes(input.value[i])) ++counter_C;
        // verifica se a string de entrada é somente número positivo ou negativo.
        if(!(algarism.includes(input.value[i]) || input.value[0] == '-')) number=false;    
    }
    if(number) return true;
    if(counter_O == counter_C) {
        let begin = input.value[0];
        let end = input.value[input.value.length-1];
        let a=input.value.length>2;
        let b=algarism.includes(begin) || special_O.includes(begin) || begin == '-';
        let c=algarism.includes(end) || special_C.includes(end);       
        let d;let e;let f;let g;let h;let j;let k;let before;let after;

        // string de entrada com tamanho maior que dois.
        // iniciar com número ou com um dos caracteres 'special_O'.
        // finalizar com número ou com um dos caracteres 'special_C'.
        if(!(a && b && c)) {
            return false; 
        }
        // término da verificação preliminar da string de entrada .  

        // verificar se string de entrada está no formato numero+operator+numero ... 
        // e com os caracteres special_O e special_C,caso forem encontrados.
        
        for(let i=1;i<input.value.length;i++) {  // percorre toda a string validando caracter por caracter.
            if(i != input.value.length-1) {
                a=algarism.includes(input.value[i-1]); 
                b=operator.includes(input.value[i-1]);
                c=special_O.includes(input.value[i-1]);  
                d=special_C.includes(input.value[i-1]);
                j=others.includes(input.value[i-1]); 

                e=algarism.includes(input.value[i+1]);
                f=operator.includes(input.value[i+1]);
                g=special_O.includes(input.value[i+1]);  
                h=special_C.includes(input.value[i+1]);
                k=others.includes(input.value[i+1]);

                //caso input.value[i] seja número:antes dele pode ser número,ou operador,ou caracter special aberto,ou caracteres others.
                //caso input.value[i] seja número:depois dele pode ser número,ou operador,ou caracter special fechado,ou caracteres others.
                before = a || b || c || j;
                after =  e || f || h || k;
                if(algarism.includes(input.value[i])) {
                    if(!(before && after)) return false;
                }

                // caso input.value[i] seja operador:antes dele pode ser número ou special fechado ou caracteres others.
                // caso input.value[i] seja operador:depois dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d || j;
                after =  e || g;
                if(operator.includes(input.value[i])) {
                    if(!(before && after)) {
                        if(input.value[i+1]=='*') i+=1;//caso seja os caracteres '**'.
                        else return false;
                    }
                }

                // caso input.value[i] seja um dos caracteres 'e' ou 'E'.
                before =  a;
                after = e || input.value[i]=='-' ;
                if(special_O.includes(input.value[i])) {
                    if(!(before && after)) return false;
                }

                // caso input.value[i] seja caracter special_O: antes dele pode ser operador e depois pode ser número.
                before =  b;
                after =  e;
                if(special_O.includes(input.value[i])) {                     
                    if(!(before && after)) return false;
                }
                // caso input.value[i] seja caracter special_C: antes dele pode ser número e depois pode ser operador.
                before =  a ;
                after =  f;
                if(special_C.includes(input.value[i])) {
                    if(!(before && after)) return false;
                }
            }else {
                // último caracter da string de entrada.
                if(!(algarism.includes(input.value[i]) || special_C.includes(input.value[i]))) return false;
            }
        }
    } else return false;   
    return true; // passou   
}

//potência de 2 .
function pow2() { 
    aux=input.value; // para memory 
    if(input.value == 0) return input.value; 
    if(validationPow()) { // validação da entrada .      
        let num=Number((Number(input.value)**2).toFixed(DECIMAL));        
        if (num==Infinity) {
            input.value = 'OverLoad'.toUpperCase();             
            lock();
            return false;       
        }else {
            input.value = num;                   
            return true;
        }
    } 
}

//potência qualquer .
function pow() {       
    input.value=input.value+'**';        
}

function validationPow() {
    const permitPow=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+'];
    if(input.value.length==0){
        nAn();
        return false;
    }  
    // verificar se cada caracter de entrada é permitido .
    for(let i of input.value) {
        if(!(permitPow.includes(i))) { 
            nAn();
            return false;      
        }
    }
    // verificar se o primeiro caracter é número ou '-'.     
    if(!(algarism.includes(input.value[0]) || input.value[0]=='-')) {       
        nAn();
        return false;
    }

    for(let i=0;i<input.value.length;i++) {            
        if(input.value[i] == 'e' || input.value[i] == 'E') {        
            let a=algarism.includes(input.value[i-1]);
            let b=(algarism.includes(input.value[i+1]) || permitPow.includes(input.value[i+1]));
            if(!(a && b)) {
                nAn();
                return false;
            }
        }
    }   
    return true;// passou
}

// not a number
function nAn() {   
    input.value = 'not a number'.toUpperCase();  
    lock();
}

//desabilitar o campo texto e os 'buttons',exceto 'button R' e 'button MR' .
function lock() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=> { 
        if(!(item.innerText == 'R' || item.innerText == 'MR')) item.disabled= true;
    });
}

function squareRoot() {  
    if(Number(input.value) < 0) {
        input.value = 'There is no'.toUpperCase();
        aux=input.value;
        lock();
        return false;  
    } 
    if(Number(input.value) == 0) return input.value = 0;
    input.value = Number((Number(input.value)**(1/2)).toFixed(DECIMAL));
}

function root() {     
    aux= input.value+'**';
    input.value="";
    radix=true;
    radical=document.querySelector("#root");
    radical.style.background="#867E7D";
    radical.disabled=true;
}

function clearAll() {  
    input.value="";
    aux=""; 
    callCount=0;
    callCount1=0;
    callCount2=0;
    radix=false;  
}

function delAll() {
    let array=[...input.value];
    array.pop();
    input.value=array.join('');  
}
 
function memory() {     
    input.value=aux;
}

function signMinus() {  
   let arr=[...input.value];
    if(callCount%2==0) {
        arr.unshift('-');
        input.value=arr.join('');
    }
    else {
        arr.shift();
        input.value=arr.join('');
    }
   ++callCount;
}

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

 function signBrackets() {   
   let arr=[...input.value];
    if(callCount2%2==0) {        
        arr.unshift('(');
        input.value=arr.join('');
    }
    else {
        arr.push(')');
        input.value=arr.join('');
    }
   ++callCount2;
 }

function log(logaritmo) {
    if(validation()) {
        if(input.value.length!=0) {
            if(Number(input.value)<=0) {
                input.value='there is no'.toUpperCase();
                aux=input.value;
                lock();
                return false;
            }
        }else return false;
        if(logaritmo) input.value=Number(Number(Math.log10(Number(input.value))).toFixed(DECIMAL)); 
        else input.value=Number(Number(Math.log(Number(input.value))).toFixed(DECIMAL));              
    }    
}

function sincos(angle) {
    aux=input.value;
    if(validation()) {
        if(angle) {
            let number=Number( Math.sin(Number(input.value)*Math.PI/180).toFixed(DECIMAL) );
            if(Number.isNaN(number)) { // caso o valor de entrada é muito grande.
                nAn();
                return;
            } 
            input.value=number;
             
        }         
        else {            
            let number=Number( Math.cos(Number(input.value)*Math.PI/180).toFixed(DECIMAL) );
            if(!(Number.isNaN(number))) { // caso o valor de entrada é muito grande.
                nAn();
                return;
            } 
            input.value=number;
        }    
    }else {
        input.value='there is no'.toUpperCase();
        lock();
        return false;
    }
    aux=input.value;//para memmory.
}

function Euler() {   
    input.value=Math.E;    
}

function PI() {
    input.value=Math.PI;    
}