"use strict";

/* inicialização de variáveis */
const DECIMAL=16; para precisão dos resultados.
 para validação da string de entrada.
const algarism=['0','1','2','3','4','5','6','7','8','9'];
const operator=['*','/','+','-'];    
const special_O=['(','[','{',];
const special_C=[')',']','}'];
const others=['.','e','E'];
const permit=[...algarism,...operator,...special_O,...special_C,...others];

const input = document.querySelector("#input");campo texto .
const div= document.querySelector("#containerButton"); div dos 'buttons'.
let aux=""; usada pela memory.
 usadas para mostrar os caracteres +,-,e,E,(,) de forma alternada.
let callCount0=0;
let callCount1=0;
let callCount2=0;
 controla as operações raiz e a porcentagem.
let operControl=false;
let radical;usada para travar e destravar o 'button' raiz.
mensagens de avisos de erros.
let message0='not a number';
let message1='overload';
let message2='there is no';
input.value="";

criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,(),MR,CL,DEL,R,='.
div.innerHTML = div.innerHTML+'<button class="operator1" >'+'+'+'</button>'+'<button class="operator1">'+'-'+'</button>';

div.innerHTML = div.innerHTML + '<button class="operator1">'+'*'+'</button>'+'<button class="operator1">'+'/'+'</button>'+
'<button onclick="generic(\'real\')">'+'R$'+'</button>'+'<button onclick="generic(\'%\')">'+'%'+'</button>';

div.innerHTML = div.innerHTML + '<button  onclick="pow2()">'+'x²'+'</button>'+'<button onclick="pow()">'+'x<sup>y</sup>'+'</button>';

div.innerHTML = div.innerHTML +'<button onclick="squareRoot()">'+'<img src="img/square-root-50.png" alt="square root icon ">';
div.innerHTML = div.innerHTML+'</button>'+'<button  id="root" onclick="root()">'+'<img src="img/square-root-50-N.png" alt="generic root icon ">'+'</button>';
div.innerHTML = div.innerHTML+'<button    onclick="generic(\'ln\')">'+'ln'+'</button>'+'<button onclick="generic(\'log\')">'+'log'+'</button>';
div.innerHTML = div.innerHTML+'<button onclick="generic(\'euler\')">'+'e'+'</button>'+'<button onclick="generic(\'pi\')">'+'PI'+'</button>';
div.innerHTML = div.innerHTML+'<button onclick="generic(\'sin\')">'+'sin'+'</button>'+'<button onclick="generic(\'cos\')">'+'cos'+'</button>'+
'<button onclick="generic(\'tan\')">'+'tan'+'</button>';

div.innerHTML = div.innerHTML + '<button  onclick="sign(\'+\',\'-\')">'+'+/-'+'</button>';
div.innerHTML = div.innerHTML+'<button  onclick="signE()">'+'E'+'</button>';
div.innerHTML = div.innerHTML+'<button onclick="sign(\'(\',\')\')">'+'( )'+'</button>';

div.innerHTML = div.innerHTML +'<button class="operator1">'+'.'+'</button>'+'<button class="operator1">'+','+'</button>';

div.innerHTML = div.innerHTML+'<button  onclick="clearAll()">'+'CL'+'</button>'+'<button  onclick="delAll()">'+'DEL'+'</button>';

div.innerHTML = div.innerHTML+'<button onclick="memory()">'+'MR'+'</button>'+
'<button  onclick="window.location.reload()">'+'R'+'</button>'+'<button onclick=equalSign()>'+'='+'</button>';


const buttons = document.querySelectorAll('button');


obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements,...operators];







adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach( (item) => {
    item.addEventListener('click',() => {
        array.push(item.innerText);
        input.value = input.value + item.innerText;
        
    });    
     console.log(item);<button class="number">0</button>
    
});

Executa a operação ao pressionar o 'button =' .
function equalSign() {  
    
    display(); 
    if(validation()) {  Para operação porcentagem.
        let str=input.value;
        if(operControl) {
            str=aux+str;
            let number=Number(eval(str).toFixed(DECIMAL));
            aux=number; Para memory.
            display(new String(number));
            operControl=false;         
            return true;
        }
    }else {
        aux=aux+input.value;
        operControl=false; 
        messageError(message0);
        return false;
    }
    console.log(validation()); 
   Para operação raiz e outras operações que não raiz. 
   if(validation() || operControl) {  Para raiz de qualquer número(opercontrol=true),a entrada será validada em separado.       
        if(operControl) {  Raiz de índice(número) qualquer de um radicando(número) qualquer.Relacionado com a função root.
            let str=aux+input.value;string que será validada,em seguida calculada a raiz a partir dela.
                 console.log(input.value);
                 console.log('operControl= '+operControl);  
            let str2=""; Índice.
            let str1=""; Radicando.
            for (let index = 0; index <str.length; index++) { Obter os dois valores(índice e radicando) da string de entrada.
                if(str[index]=='*' && str[index+1]=='*') {
                    str1=str.substring(0,index);
                    str2=str.substring(index+2,str.length);
                    break;                                                                            
                }               
            }
                 console.log('str1= '+str1);
                 console.log('str2= '+str2);
             Validação da string de entrada.
            let number=(Number(str2))-(Math.trunc(Number(str2))); Índice inteiro.               
            let a=Number(str1)>0; str1(radicando) poderá ser positivo ou negativo,conforme for str2(c).
            let b=Number(str2)>=2; Somente índice maior ou igual a 2.
            let c=Number(str2)%2==0; Quando for par,str1 deverá ser positivo,caso contrário,str1 pode ser positivo ou negativo.
            let d=number==0; str2 deverá ser inteiro.
            if(!((a&&b&&d) || (b&&(!c)&&d))) { 
                aux=str; Para memory.
                operControl=false; 
                messageError(message2);              
                return false;
            }
            Operação raiz de índice qualquer e radicando qualquer.
            if((!a) && (!c)) {
                 Radicando negativo e índice ímpar.
                number=(-1)*( Number(((Math.abs(Number(str1)))**(1/Number(str2))).toFixed(DECIMAL)));                                          
                display(new String(number));
            }else {
                 Para outros casos. 
                number=Number((Number(str1)**(1/(Number(str2)))).toFixed(DECIMAL));
                display(new String(number));
            }
            aux=number;  Para memory. 
            radical.disabled=false;  
            radical.style.background="lightblue";       
            operControl=false;
            return true;
        }
                 Outras operações que não raiz.  
                 console.log(input.value);     
        let number = Number(eval(input.value).toFixed(DECIMAL));
        aux=number;  para memory.
        if (number==Infinity) {
            messageError(message1);;
            return false;       
        }else {  
                 console.log('number= '+number);                             
            display(new String(number));           
            return true;        
        }
        
    }else {
        aux=input.value; Para 'memory'.
        messageError(message0);
        return false;
    }       
}
Insere vírgula para separar milhares.
function display(disPlay) {
     let arr=[];
             console.log(disPlay);
    if(disPlay.includes('.')) {
        let a=disPlay.indexOf('.');
             console.log('a= '+a);       
        for(let i=a;i>0;i-=3) {
            arr.unshift(disPlay.substring((i-3),i));
        }   
             console.log(arr);  
        input.value=arr.join(',')+disPlay.substring(a,disPlay.length);
            
    }else {
         for(let i=disPlay.length;i>0;i-=3) {
            arr.unshift(disPlay.substring((i-3),i));
        }
             console.log(arr);
        input.value=arr.join(',');
            
    }    
}

 validar a string de entrada.
function validation() { 
         console.log(typeof(input.value));
         início da verificação preliminar da string de entrada .
         console.log(input.value);  
   let str=input.value.replaceAll(',','');
         console.log(str);
    let counter_O=0; quantidade de caracteres abertos.
    let counter_C=0; quantidade de caracteres fechados.
    let number=true;
    let a=false;
    let b=str[0] == '-';
      
      contagem dos caracteres special_O e special_C.  
    for(let i=0;i<str.length;i++) {
        if(special_O.includes(str[i])) ++counter_O;    
        else  if(special_C.includes(str[i])) ++counter_C;
         verifica se a string de entrada é somente número positivo ou negativo.
        a=algarism.includes(str[i]);
             console.log('b= '+b);
             console.log('a= '+a);
        if( (!a&&!b) || (!a&&b) ) number=false;    
    }
        
    if(number) return true; verifica se a string de entrada é somente número positivo ou negativo.
         console.log(str);
    if(counter_O == counter_C) {
        let begin = str[0];
        let end = str[str.length-1];
        a=str.length>2;
        b=algarism.includes(begin) || special_O.includes(begin) || begin == '-';       
        let c=algarism.includes(end) || special_C.includes(end) || begin=='+' ;       
        let d;let e;let f;let g;let h;let j;let k;let before;let after;
         console.log(a);
         console.log(b);
         console.log(c); 
         console.log(before);
         console.log(after);      

         string de entrada com tamanho maior que dois.
         iniciar com número ou um dos caracteres 'special_O',ou '+',ou '-'.
         finalizar com número ou com um dos caracteres 'special_C'.
        if(!(a && b && c )) { 
           return false; 
        }
         término da verificação preliminar da string de entrada .  

         verificar se string de entrada está no formato numero+operator+numero ... 
         e com os caracteres special_O e special_C.        
        for(let i=1;i<str.length;i++) {   percorre toda a string validando caracter por caracter.
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

                caso str[i] seja número:antecessor dele pode ser número,ou operador,ou caracter special aberto,ou caracteres others.
                caso str[i] seja número:sucessor dele pode ser número,ou operador,ou caracter special fechado,ou caracteres others.
                before = a || b || c || j;  antecessor do caracters str[i];
                after =  e || f || h || k;  sucessor do caracter str[i];
                     console.log('i= '+i);
                if(algarism.includes(str[i])) {
                    
                    
                    if(!(before && after)) return false;
                     console.log('passou aqui');
                }

                 caso str[i] seja operador: antecessor dele pode ser número ou special fechado ou caracteres others.
                 caso str[i] seja operador: sucessor dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d || j;
                after =  e || g;
                if(operator.includes(str[i])) {
                    
                    
                    if(!(before && after)) {
                        if(str[i+1]=='*') i+=1;caso seja os caracteres '**'.
                        else return false;
                     console.log('passou aqui');
                    }
                }

                 caso str[i] seja um dos caracteres 'e' ou 'E'.
                  antecessor deve ser número.
                  sucessor deve ser número ou caracter '-'.
                before =  a;
                after = e || str[i]=='-' ;
                if(str[i]=='e' || str[i]=='E') {
                    
                    
                    if(!(before && after)) return false;
                     console.log('passou aqui');
                }

                 caso str[i] seja caracter special_O: antes dele pode ser operador e depois pode ser número.
                before =  b;
                after =  e;
                if(special_O.includes(str[i])) {
                    
                    
                    if(!(before && after)) return false;
                     console.log('passou aqui');
                }
                 caso str[i] seja caracter special_C: antes dele pode ser número e depois pode ser operador.
                before =  a ;
                after =  f;
                if(special_C.includes(str[i])) { 
                     console.log('before: '+before);
                    
                    if(!(before && after)) return false;
                    
                }
            }else {
                 último caracter da string de entrada.
                if(!(algarism.includes(str[i]) || special_C.includes(str[i]))) return false;
            }
        }
    } else return false; 

    return true;  passou   
}

 validação da entrada,que é usada pela função pow2.
function validationPow() {
          console.log(input.value);
    let str=input.value;
    const permitPow=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+'];
    if(str.length==0){
        messageError(message0);
        return false;
    }  
     verificar se cada caracter de entrada.
    for(let i of str) {
        if(!(permitPow.includes(i))) { 
            
            return false;      
        }
    }
     verificar se o primeiro caracter é número ou '-'.     
    if(!(algarism.includes(str[0]) || str[0]=='-')) { 
        return false;
    }

    for(let i=0;i<str.length;i++) {            
        if(str[i] == 'e' || str[i] == 'E') {        
            let a=algarism.includes(str[i-1]);
            let b=(algarism.includes(str[i+1]) || permitPow.includes(str[i+1]));  
            
            
            if(!(a && b)) {               
                return false;
            }
        }
    }   
    return true; passou
  }

potência de base 2 .
function pow2() { 
    let str=input.value;   
    if(validationPow()) {  validação da entrada .      
        let number=Number((Number(str)**2).toFixed(DECIMAL));        
        if (number==Infinity) {
            messageError(message1);
            return false;       
        }else {
            aux=number;   Para 'memory'.
            disPlay(new String(number));                  
            return true;
        }
    }else {
        messageError(message0);
        return false;
    }
}

Potência qualquer base e qualquer expoente.
function pow() {       
    input.value=input.value+'**';        
}

 Raiz quadrada.
function squareRoot() {
    let srtr=input.value;
    aux=str; para 'memory'.
    if(validation()) {  validação da entrada .
        if(Number(str) < 0) {
            aux=str; para 'memory'.
            messageError(message2);
            return false;  
        }    
        let number = Number((Number(str)**(1/2)).toFixed(DECIMAL));
        aux=number; Para 'memory'.
        display(new String(number));
        return true;
    }else {
        messageError(message0); 
        return false; 
    } 
}

 Raiz de índice qualquer e radicando qualquer.Relacionado com a função equalSign.
function root() { 
    let str=input.value;    
    aux= str+'**';
    input.value="";
    operControl=true;
    radical=document.querySelector("#root");
    radical.style.background="#867E7D";
    radical.disabled=true;
}
 Fornece número de euler,valor de PI,seno,cosseno,tangente,logaritmo decimal,logaritmo neperiano,
 Símbolo monetário do Real,porcentagem.
function generic(param) {
    console.log(param);
    switch(param) {
        case 'euler': input.value=Math.E; return true;

        case 'pi': input.value=Math.PI; return true;

        case 'real':    let array=[...input.value];
                        array.unshift('R$');
                        input.value=array.join("");
                        return true;  

        case '%':  if(validation()) {
                        aux=input.value+'*0.01*';
                        input.value="";
                        operControl=true;
                        return true;
                    }else {
                        aux=input.value; Para 'memory'.
                        messageError(message0);
                        return false;
                    }                             
    }
    if(validation()) {        
        if(input.value.length!=0) {
            let str=input.value;
            switch(param) {
                case 'sin': input.value=aux=Number( Math.sin((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) ); return true;
                case 'cos':input.value=aux=Number( Math.cos((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );  return true; 
                case 'tan': let a= Number( Math.sin((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );
                            let b= Number( Math.cos((Math.abs(Number(str))*Math.PI)/180).toFixed(DECIMAL) );
                            input.value=Number((a/b).toFixed(DECIMAL));
                            return true;           
            }
            if(Number(str)>0) {
                switch(param) {
                    case 'log':input.value=aux=Number(Number(Math.log10(Number(str))).toFixed(DECIMAL));return true;
                    case 'ln' :input.value=aux=Number(Number(Math.log(Number(str))).toFixed(DECIMAL));return true;                  
                } 

            } else {
                aux=input.value; Para 'memory'.
                messageError(message2);                            
                return false;
            }           
        }else return false;

    }else {
        aux=input.value; Para 'memory'.
        messageError(message0);
        return false;
    }   
}

function messageError(message) {   
    input.value=message.toUpperCase();
    lock();
    return false;        
}

desabilitar o campo texto e os 'buttons',exceto 'button R' e 'button MR' .
function lock() {
    input.style.color = "red";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=> { 
        
        if(!(item.innerText == 'R' || item.innerText == 'MR')) item.disabled= true;        
        
    });
}

function clearAll() {  
    input.value="";
    aux=""; 
    callCount0=0;
    callCount1=0;
    callCount2=0;
    operControl=false;  
}

function delAll() {
    let array=[...input.value];
    array.pop();
    input.value=array.join('');  
}
 
function memory() {     
    input.value=aux;
}
Alternância entre os sinais '+' e  '-'.
Alternância entre os sinais '(' e ')'.
function sign(A,B) {
    console.log('input= '+input.value);
    console.log('callCount0= '+callCount0);
    console.log('callCount2= '+callCount2); 
    let arr=[...input.value];  
    switch(A) {
        case '+':   console.log(arr);    
                    if(arr.length!=0) {
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
                            else  input.value=B+input.value+B;  
                        }
                
                    }else {
                        if(callCount0%2==0) input.value=A+input.value;        
                        else input.value=B+input.value;
                    }
                    console.log(arr);  
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
                    console.log('input= '+arr);
                    break;
    } 
}

 Alternância entre os caracteres :'e','E'.
function signE() {
        console.log('C= '+callCount1);   
    let arr=[...input.value];
       console.log(arr);
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
           console.log(arr);
        ++callCount1;
    }
 }
 
 


 /*

 alternada entre os caracteres :'(' e ')'.
 function signBrackets() {
       console.log(callCount2);   
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


not a number
function nAn() {   
    input.value = 'not a number'.toUpperCase();  
    lock();
}

function Euler() {   
    input.value=Math.E;    
}

function PI() {
    input.value=Math.PI;    
}

function log(logaritmo) {  logaritmo decimal e natural
    if(validation()) {
        if(input.value.length!=0) {
            if(Number(input.value)<=0) {
                aux=input.value; 
                messageError(message2);                            
                return false;
            }
        }else return false; 
        console.log(logaritmo);
        if(logaritmo) input.value=Number(Number(Math.log10(Number(input.value))).toFixed(DECIMAL)); 
        else input.value=Number(Number(Math.log(Number(input.value))).toFixed(DECIMAL));              
    }    
}

function sincos(angle) {
    console.log(input.value);
    aux=input.value;
    if(validation()) {
        if(angle) {
            let number=Number( Math.sin(Number(input.value)*Math.PI/180).toFixed(DECIMAL) );
            if(!(Number.isNaN(number))) { 
                messageError(message0);caso o valor de entrada é muito grande         
                return;
            }                  
            input.value=number;             
        }         
        else {            
            let number=Number( Math.cos(Number(input.value)*Math.PI/180).toFixed(DECIMAL) );
            if(!(Number.isNaN(number))) { 
                messageError(message0);caso o valor de entrada é muito grande.               
                return;
            }
            input.value=number;
        }    
    }else {
        messageError(message0);
        return false;
    }
    aux=input.value;para memmory.
}


if(!((a&&(!b)&&c) || (a && b))) {
    nAn();
    console.log('aqui');
    return false; 
}    
a=algarism.includes(input.value[input.value.length-1]); garante que o último caracter seja número .
b=input.value.startsWith('('); string que inicia e finaliza com parênteses .
c=input.value.endsWith(')');
console.log(a);
console.log(b);
console.log(c);
if((a||(!b)||(!c)) && ((!a)||b||c)) {
    nAn();
    console.log('aqui');
    return false;
}

if(i!=input.value.length-1) {
switch(input.value[i]) {
    case'+': 
        if( !(a && b) ) {
             nAn();
            console.log('aqui');
            return false;
        };break;

    case'-': 
        if( !(algarism.includes(input.value[i-1]) && (algarism.includes(input.value[i+1] || special_O.includes(input.value[i+1]))) ) ) {
             nAn();
            console.log('aqui');
            return false;
        };break;

    case'/': 
        if( !(algarism.includes(input.value[i-1]) && (algarism.includes(input.value[i+1]) || special_O.includes(input.value[i+1])) ) ) {
             nAn();
            console.log('aqui');
            return false;
        };break;

    case'*':                    
        if((input.value[i]=='*') && (input.value[i+1]=='*')) i+=1;  caracteres '**'
        else {
            if( !(algarism.includes(input.value[i-1]) && (algarism.includes(input.value[i+1]) || special_O.includes(input.value[i+1])) ) ) {
                nAn();
                console.log('aqui');
                return false;
            } 
        };break;
}   

operator1.forEach( (item) => {
item.addEventListener('click',() => {
array.push(item.innerText);
A=input.value;  primeiro operando .
input.value = input.value + item.innerText;

});  

});

function Asterisk(argument) {  permitir '**' (operação potência e raiz) .
if(!(argument+1 > input.value.length-1)) {
if((input.value.charAt(argument) == '*' && input.value.charAt(argument+1) == '*')) {
    asteriskDouble=true;
    return false;
} 
}else {
    if(!(algarism.includes(input.value.charAt(argument)))) {  garante que o último caracter seja número .
        nAn();
        return false;
    }          
}

return true;  passou .
} 

    let str=input.value[i]+input.value[i+1]+input.value[i+2];
    if(str.equals('***')) {           
        nAn();
        console.log('aqui');
        return false;                      
    }
    
    str=input.value[i]+input.value[i+1];
    if(str.equals('**')) {
        if( !(algarism.includes(input.value[i-1]) && algarism.includes(input.value[i+2])) ){
            nAn();
            console.log('aqui');
            return false;
        }           
    }
    ++asterisk1;
        if(asterisk1>1) {
            
        }      
    else if(input.value[i]=='*') asterisk2+=1;  

 achar e marcar os caracteres dobrados '**' para operações potência e raiz .
if(asteriskDouble) { 
    for(let [index,i] of input.value.entries()) {
        if((index+1)<input.value.length-1){
            if(input.value.charAt(index) == '*' && input.value.charAt(index+1) == '*') {
                asteriskDouble=false;
                idAsterisk_1=index;
                idAsterisk_2=index+1;
                A.push(input.value.charAt(index));
                A.push(input.value.charAt(index+1));
                break;
            }  
        }
    }
}
 verificar todos caracteres de entrada.Exceto os caracteres '**',caso seja as operações potência ou raiz .
console.log(input.value);
for(let index=0;index<array.length;index++) {   
        console.log(array[index]);
        console.log(index);
    if(permit.includes(array[index])) {  verificar se cada caracter é permitido .
        if(!(array[index] == '*' && array[index+1] == '*')) { && asteriskDouble)) {
            if (A.includes(array[index])) {  verificar se existe caracter repetido,exceto número .
                if(!(algarism.includes(array[index]))) {
                    nAn();
                    return false;
                }
            }
            A.push(array[index]);
        }          

    }else {
        console.log('aqui');
        nAn();
        return false; 
    } 
}
    

 A=[...input.value];    

 return true; passou
    
}

    
 A=[...input.value];
    caracteres 'e','E','+' bloqueados no campo texto se digitados pelo teclado . 
    input.addEventListener('keypress',(e)=>{ 
    if(e.key === 'e'.toUpperCase() || e.key === '+') e.preventDefault();            
});


for(let i of input.value){
    if(!Permit.includes(i)){
        return false;
    }
}
return true;


for(let i of input.value){
    if(!Permit.includes(i)){
        return false;
    }
}
return true;

 validação da expressão entrada .
function validation() {
for(let i of input.value){
    if(!Permit.includes(i)){
        return false;
    }
}
return true;
}


array.length=0;

let B="";  segundo operando .
let array1 = [...input.value];
console.log(array1);  (4) ['8', '^', '-', '2'] 
    

console.log(A.length);
console.log(array1.indexOf(array1[A.length]) +1);índice do último operando .
obter o segundo operando B .
for(let i=array1.indexOf(array1[A.length])+1;i<array1.length;i++){
        B=B+array1[i];
}
if(typeof(Number(A))!='number' && typeof(Number(B))!='number') return input.value='Not a number!';
console.log('A= '+ A);
console.log('B= '+B);
console.log(array1[A.length]);
console.log();
switch(array1[A.length]){  selecionar o operador escolhido .
    case '+':input.value = (Number(A)+Number(B)).toFixed(DECIMAL);break;
    case '-':input.value = (Number(A)-Number(B)).toFixed(DECIMAL);break;
    case '*':input.value = (Number(A)*Number(B)).toFixed(DECIMAL);break;
    case '/':input.value = (Number(A)/Number(B)).toFixed(DECIMAL);break;
    case '^':input.value = (eval(A)**eval(B)).toFixed(DECIMAL);break;  potenciação
    case 'r':  raiz (índices inteiros ou decimais,positivos ou negativos) .                 
                if(Number(A) < 0 ){
                    if(Number(B)%2 != 0){
                        let num = eval(A)*(-1); 
                        input.value = ((num ** (1/eval(B)))*(-1)).toFixed(DECIMAL);    
                    }else input.value = 'There is no!';                      

                }else input.value = (eval(A) ** (1/eval(B))).toFixed(DECIMAL);                    
                break;
                


                
                console.log('PASSOU AQUI!');
                console.log(Number(A));
                console.log(Number(B));
                                    
                let index = 1/(Number(B));
                console.log(typeof(num));
                console.log(typeof(index));
                console.log(num);
                console.log(index);
                console.log((num) ** index);
                
                break;
                
}                 
A="";
The Math.fround() static method returns the nearest 32-bit single precision float representation of a number.



function overLoad() {
input.style.color = "green";
input.style.fontweight ="bold";
input.value='OverLoad'.toUpperCase();
 desabilta o campo texto e os 'buttons' exceto 'button R' .
input.disabled = true;
buttons.forEach((item)=>{
    console.log(item);
    if(!item.innerText == 'R') item.disabled= true;
    console.log(item);
})
} 


function signMinus() {
input.value=input.value+'-';
}
function signSlash() {
input.value=input.value+'/';
}

function getB() {
let B="";  segundo operando .
let array1 = [...input.value];
    obter o segundo operando .
for(let i=array.indexOf(array[A.length])+1;i<array.length;i++){
        B=B+array[i];
} 
}

for(let i=0;i<input.length;i++){
    console.log(i);
    console.log(codepointAt(i));
    if( !(input.value.codepointAt(i) > 48 && input.value.codepointAt(i) < 56)){            
        return true;
    }
}
return false;
}

function number0(){
    buttonMinus.setAttribute("disabled",true);
    buttonPlus.removeAttribute("disabled");
zero = 0;
input.value=input.value + zero;
if(equal){
    A=A.concat(zero.toString());
}
};

console.log(array); 
console.log(A);
console.log(B);
console.log(typeof '+');
console.log(typeof Number('awesome'));

console.log(div);
calculator.js:19
<div id=​"containerButton">​…​</div>​

const elements = document.querySelectorAll('button');
lista 'elements' : traz todos buttons em uma lista tipo NodeList.Não é array.
console.log(elements);
calculator.js:23
NodeList(15) [button, button, button, button, button, button, button, button,
button, button, button, button, button, button, button]0: button1: button2: button3: button4: 
button5: button6: button7: button8: button9: button10: button11: button12: button13: button14: 
buttonlength: 15[[Prototype]]: NodeListentries: ƒ entries()forEach: ƒ forEach()item: ƒ item()keys: ƒ keys()length: (...)values: ƒ values()constructor: ƒ NodeList()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.toStringTag): "NodeList"get length: ƒ length()[[Prototype]]: Object

calculator.js:24 <button onclick=​"equalSign()​">​=​</button>​

let all=elements.entries();
 cada elemento de 'all' é um array,e este array tem dois elementos,o primeiro(0) é posição da lista 
 'elements',segundo(1) é o elemento da lista 'elements' 
for (let i of all){
console.log(i);
console.log(i[1].innerText);
}

calculator.js:27 (2) [0, button]
calculator.js:28 0
calculator.js:27 (2) [1, button]
calculator.js:28 1
calculator.js:27 (2) [2, button]
calculator.js:28 2
calculator.js:27 (2) [3, button]
calculator.js:28 3
calculator.js:27 (2) [4, button]
calculator.js:28 4
calculator.js:27 (2) [5, button]
calculator.js:28 5
calculator.js:27 (2) [6, button]
calculator.js:28 6
calculator.js:27 (2) [7, button]
calculator.js:28 7
calculator.js:27 (2) [8, button]
calculator.js:28 8
calculator.js:27 (2) [9, button]
calculator.js:28 9
calculator.js:27 (2) [10, button]
calculator.js:28 +
calculator.js:27 (2) [11, button]
calculator.js:28 -
calculator.js:27 (2) [12, button]
calculator.js:28 *
calculator.js:27 (2) [13, button]
calculator.js:28 /
calculator.js:27 (2) [14, button]
calculator.js:28 =
0: 141: buttonaccessKey: ""ariaAtomic: nullariaAutoComplete: nullariaBrailleLabel: nullariaBrailleRoleDescription: nullariaBusy: nullariaChecked: nullariaColCount: nullariaColIndex: nullariaColSpan: nullariaCurrent: nullariaDescription: nullariaDisabled: nullariaExpanded: nullariaHasPopup: nullariaHidden: nullariaInvalid: nullariaKeyShortcuts: nullariaLabel: nullariaLevel: nullariaLive: nullariaModal: nullariaMultiLine: nullariaMultiSelectable: nullariaOrientation: nullariaPlaceholder: nullariaPosInSet: nullariaPressed: nullariaReadOnly: nullariaRelevant: nullariaRequired: nullariaRoleDescription: nullariaRowCount: nullariaRowIndex: nullariaRowSpan: nullariaSelected: nullariaSetSize: nullariaSort: nullariaValueMax: nullariaValueMin: nullariaValueNow: nullariaValueText: nullassignedSlot: nullattributeStyleMap: StylePropertyMap {size: 0}attributes: NamedNodeMap {0: onclick, onclick: onclick, length: 1}autocapitalize: ""autofocus: falsebaseURI: "file:/C:/POOJava/JavaScript/Desafio_JavaScript/project_calculator/calculator.html"childElementCount: 0childNodes: NodeList [text]children: HTMLCollection []classList: DOMTokenList [value: '']className: ""clientHeight: 50clientLeft: 0clientTop: 0clientWidth: 50contentEditable: "inherit"dataset: DOMStringMap {}dir: ""disabled: falsedraggable: falseelementTiming: ""enterKeyHint: ""firstChild: textfirstElementChild: nullform: nullformAction: "file:/C:/POOJava/JavaScript/Desafio_JavaScript/project_calculator/calculator.html"formEnctype: ""formMethod: ""formNoValidate: falseformTarget: ""hidden: falseid: ""inert: falseinnerHTML: "="innerText: "="inputMode: ""isConnected: trueisContentEditable: falselabels: NodeList []lang: ""lastChild: textlastElementChild: nulllocalName: "button"name: ""namespaceURI: "http:www.w3.org/1999/xhtml"nextElementSibling: nullnextSibling: nullnodeName: "BUTTON"nodeType: 1nodeValue: nullnonce: ""offsetHeight: 50offsetLeft: 436offsetParent: bodyoffsetTop: 515offsetWidth: 50onabort: nullonanimationend: nullonanimationiteration: nullonanimationstart: nullonauxclick: nullonbeforecopy: nullonbeforecut: nullonbeforeinput: nullonbeforematch: nullonbeforepaste: nullonbeforexrselect: nullonblur: nulloncancel: nulloncanplay: nulloncanplaythrough: nullonchange: nullonclick: ƒ onclick(event)onclose: nulloncontentvisibilityautostatechange: nulloncontextlost: nulloncontextmenu: nulloncontextrestored: nulloncopy: nulloncuechange: nulloncut: nullondblclick: nullondrag: nullondragend: nullondragenter: nullondragleave: nullondragover: nullondragstart: nullondrop: nullondurationchange: nullonemptied: nullonended: nullonerror: nullonfocus: nullonformdata: nullonfullscreenchange: nullonfullscreenerror: nullongotpointercapture: nulloninput: nulloninvalid: nullonkeydown: nullonkeypress: nullonkeyup: nullonload: nullonloadeddata: nullonloadedmetadata: nullonloadstart: nullonlostpointercapture: nullonmousedown: nullonmouseenter: nullonmouseleave: nullonmousemove: nullonmouseout: nullonmouseover: nullonmouseup: nullonmousewheel: nullonpaste: nullonpause: nullonplay: nullonplaying: nullonpointercancel: nullonpointerdown: nullonpointerenter: nullonpointerleave: nullonpointermove: nullonpointerout: nullonpointerover: nullonpointerrawupdate: nullonpointerup: nullonprogress: nullonratechange: nullonreset: nullonresize: nullonscroll: nullonsearch: nullonsecuritypolicyviolation: nullonseeked: nullonseeking: nullonselect: nullonselectionchange: nullonselectstart: nullonslotchange: nullonstalled: nullonsubmit: nullonsuspend: nullontimeupdate: nullontoggle: nullontransitioncancel: nullontransitionend: nullontransitionrun: nullontransitionstart: nullonvolumechange: nullonwaiting: nullonwebkitanimationend: nullonwebkitanimationiteration: nullonwebkitanimationstart: nullonwebkitfullscreenchange: nullonwebkitfullscreenerror: nullonwebkittransitionend: nullonwheel: nullouterHTML: "<button onclick=\"equalSign()\">=</button>"outerText: "="ownerDocument: documentparentElement: div#containerButtonparentNode: div#containerButtonpart: DOMTokenList [value: '']prefix: nullpreviousElementSibling: buttonpreviousSibling: buttonrole: nullscrollHeight: 50scrollLeft: 0scrollTop: 0scrollWidth: 50shadowRoot: nullslot: ""spellcheck: truestyle: CSSStyleDeclaration {accentColor: '', additiveSymbols: '', alignContent: '', alignItems: '', alignSelf: '', …}tabIndex: 0tagName: "BUTTON"textContent: "="title: ""translate: truetype: "submit"validationMessage: ""validity: ValidityState {valueMissing: false, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}value: ""virtualKeyboardPolicy: ""willValidate: true[[Prototype]]: HTMLButtonElement(...)length: 2[[Prototype]]: Array(0)




const buttoMenos= document.querySelector("#buttonMenos");

function cronous(){
 console.log(num.value);    
let numero = ['0','1','2','3','4','5','6','7','8','9','-'];  caracteres aceitos na entrada   
 console.log(numero);    
let array=[];                  
array=(num.value).split("");  correponde o valor de entrada 
    
if ( validacao(array,numero) ){ validação do valor de entrada  
    aux=0;   
    tempo=Math.abs(parseInt(num.value));                
    if (tempo != 0){
        if(control) num.value=0; insere o valor zero para contagem progressiva
        else aux=num.value; guarda o valor de  entrada em 'aux' para repetir a contagem regressiva como o mesmo valor
        let id=setInterval(function(){           
            

                if (control){  contagem progressiva
                    num.value=aux;                           
                    ++aux;
                    num.value=aux;                                  
                    if(tempo == aux) clearInterval(id); 

                }else {  contagem regressiva
                    --tempo;
                    num.value = tempo;
                    if(tempo == 0) clearInterval(id);              
                }

                
        },1000);
    }else num.value=texto1;
}else num.value=texto2;

}

function mais(){  defini contagem progressiva
control=true;
}

function menos() {  defini contagem regressiva,que é a default
control=false;    
if(num.value == 0) num.value = aux;insere o valor novamente para repetir contagem regressiva
}

function validacao(array,numero) {
if(array.length != 0){        
    verificar se a entrada é um número
    for (let i=0;i<array.length;i++){ 
    verificar se o sinal de menos '-' é único ,e,é o primeiro caracter do valor entrado
        console.log(array.indexOf('-',i));
        if(array.indexOf('-',i) != 0){
            return false;
        }else{  verificar os outros caracteres de entrada,que só podem ser números
            if(!numero.includes(array[i])){ 
                return false;
            }
        }
    }
}else return false;

return true;  retorna true se passar na validação
}

    
    
    
num.setAttribute("disable",true);
num.removeAttribute("disable");
        
        


    if(i!=0 & array[i] == '-'){
            return false;
        }else{  verificar os outros caracteres de entrada,que só podem ser números
            if(!numero.includes(array[i])){ 
                return false;
            }
        }


indexOf:
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));
Expected output: 1

Start from index 2 (inclusive)
console.log(beasts.indexOf('bison', 2))
*/