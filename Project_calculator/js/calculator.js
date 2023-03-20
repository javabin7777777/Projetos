"use strict";

/* inicialização de variáveis */

var asteriskDouble = false;//somente para operação raiz .
const DECIMAL=10;
const algarism=['0','1','2','3','4','5','6','7','8','9'];
const permit=['0','1','2','3','4','5','6','7','8','9','.','*','/','+','-','sqrt','radix','(',')','[',']','{','}','e','E'];    
const especials=['(',')','[',']','{','}'];
const operator=['*','/','+','-'];
const input = document.querySelector("#input");//campo texto .
const div= document.querySelector("#containerButton");// div dos 'buttons' .
input.value="";
//console.log(div);
//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,(,),=,CL,DEL,R' .
div.innerHTML = div.innerHTML+'<button class="operator1" >'+'+'+'</button>'+'<button class="operator1">'+'-'+
'</button>';
div.innerHTML = div.innerHTML + '<button class="operator1">'+'*'+'</button>'+'<button class="operator1">'+'/'+
'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="pow2()">'+'x²'+'</button>'+
'<button onclick="pow()">'+'x<sup>y</sup>'+'</button>';
div.innerHTML = div.innerHTML +'<button onclick="squareRoot()">'+
'<img src="img/square-root-50.png" alt="square root icon ">'+
'</button>'+'<button  onclick="root()">'+'<img src="img/square-root-50-N.png" alt="generic root icon ">'+
'</button>'+
'<button  onclick="log()">'+'Log'+'</button>'+'<button  onclick="ln()">'+'Ln'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="signMinus()">'+'+/-'+'</button>';
div.innerHTML = div.innerHTML +'<button class="operator1">'+'.'+'</button>'+
'<button class="operator1">'+'('+'</button>'+'<button class="operator1">'+')'+'</button>'+
'<button onclick=equalSign()>'+'='+'</button>'+'<button  onclick="clearAll()">'+'CL'+'</button>'+
'<button  onclick="delAll()">'+'DEL'+'</button>'+'<button  onclick="window.location.reload()">'+'R'+'</button>';

//console.log(div);

const buttons = document.querySelectorAll('button');
//console.log('buttons: ');
//console.log(buttons);
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');//'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
//obter os 'buttons' '+,-,*,/' e insere na lista operator1 .
const operator1 = document.querySelectorAll('.operator1');

//console.log(elements);
//console.log(elements[0]);//<button class="number">0</button>
//console.log(elements[0].nextElementSibling);//<button class="number">1</button>
//console.log(operator1);
//console.log(operator1[0].innerText);

//adicionar eventos aos 'buttons' de 0 a 9 .
elements.forEach( (item) => {
    item.addEventListener('click',() => {
        //array.push(item.innerText);
        input.value = input.value + item.innerText;
        //console.log(array);
    });
    
   // console.log(item);//<button class="number">0</button>
    //console.log(item.innerText);
});

//adicionar eventos aos 'buttons' '+,-,*,/,.,(,)' .
operator1.forEach( (item) => {
    item.addEventListener('click',() => {
        //array.push(item.innerText);
        //A=input.value; // primeiro operando .
        input.value = input.value + item.innerText;
        //console.log(array);
    });
  
    //console.log(item);//<button class="operator1">+</button> 
});

//executa a operação ao pressionar o 'button =' .
function equalSign() {  
    console.log('input: '+input.value);
    console.log('A= '+A);
    if(validation()) input.value = Number(eval(input.value).toFixed(DECIMAL));   
}

// validar a string de entrada .
// saída é uma string que será usada para o cálculo .
function validation() {  

   // verificação preliminar da string de entrada . 
    let begin = input.value[0];
    let a=input.value.length>2;
    let b=algarism.includes(begin);
    let c=especials.includes(begin);
    console.log(a);
    console.log(b);
    console.log(c);
     // string de entrada com tamanho maior que dois,e,iniciar com número ou com caracteres especiais .
    if(!((a&&(!b)&&c) || (a && b))) {
        nAn();
        console.log('aqui');
        return false; 
    }     
    a=algarism.includes(input.value[input.value.length-1]);// garante que o último caracter seja número .
    b=input.value.startsWith('(');// string que inicia e finaliza com parênteses .
    c=input.value.endsWith(')');
    console.log(a);
    console.log(b);
    console.log(c);
    if((a||(!b)||(!c)) && ((!a)||b||c)) {
        nAn();
        console.log('aqui');
        return false;
    }   

    // verificar se string de entrada está no formato numero+operator+numero ...  
    for(let i=1;i<input.value.length;i++) { 
       
        if(i!=input.value.length-1) {
            switch(input.value[i]) {
                case'+': 
                    if( !(algarism.includes(input.value[i-1]) && algarism.includes(input.value[i+1])) ) {
                        nAn();
                        console.log('aqui');
                        return false;
                    };break;

                case'-': 
                    if( !(algarism.includes(input.value[i-1]) && algarism.includes(input.value[i+1])) ) {
                        nAn();
                        console.log('aqui');
                        return false;
                    };break;

                case'/': 
                    if( !(algarism.includes(input.value[i-1]) && algarism.includes(input.value[i+1])) ) {
                        nAn();
                        console.log('aqui');
                        return false;
                    };break;

                case'*':                    
                    if((input.value[i]=='*') && (input.value[i+1]=='*')) i+=1; // caracteres '**'

                    else {
                        if( !(algarism.includes(input.value[i-1]) && algarism.includes(input.value[i+1]))) {
                            nAn();
                            console.log('aqui');
                            return false;
                        } 
                    }
            }   
        }
    }
    return true; // passou
}


function Asterisk(argument) { // permitir '**' (operação potência e raiz) .
    if(!(argument+1 > input.value.length-1)) {
        if((input.value.charAt(argument) == '*' && input.value.charAt(argument+1) == '*')) {
            asteriskDouble=true;
            return false;
        } 
    }else {
        if(!(algarism.includes(input.value.charAt(argument)))) { // garante que o último caracter seja número .
            nAn();
            return false;
        }          
    }

    return true; // passou .
} 

//potência de 2 .
function pow2() {
    console.log(A);
    if(input.value == 0) return input.value = 0;
    if(validationPow()) { // validação da entrada .      
        let num=Number((Number(A.join(''))**2).toFixed(DECIMAL));
        A.length=0;//para a próxima operação,e caso o 'button =' for pressionado .
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
    asteriskDouble=true;   
    input.value=input.value+'**';        
}

function validationPow() {
    console.log(input.value);       
    const permitPow=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+'];

    // verificar se o primeiro caracter é número .     
    if( !(algarism.includes(input.value[0]))) {       
        nAn();
        return false;
    }

    //para entradas como por exemplo: '2e' ou '2E' .
    for(let i of input.value) {
        if(((i == 'e' || i == 'E') && (input.value.length==2))) {           
             nAn();
            return false;
        }
    }

    // verificar se cada caracter de entrada é permitido e se é repetido.Exceto número .
    for(let i of input.value) {
        if(permitPow.includes(i)) { // verificar se cada caracter é permitido .
              console.log('aqui');
            if (A.includes(i)) { // verificar se existe caracter repetido,exceto número .
                  console.log('aqui');
                if(!(algarism.includes(i))) {
                    nAn();
                    return false;
                }
            }
            //console.log(A);

        }else {            
            nAn();
            return false; 
        } 
    }
    A=[...input.value];
    console.log('A= '+A);
    return true;// passou
}

// not a number
function nAn() {
    A.length=0;
    input.value = 'not a number'.toUpperCase();
    lock();
}

//desabilitar o campo texto e os 'buttons',exceto 'button R' .
function lock() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=>{ 
        //console.log(item);
        if(!(item.innerText == 'R')) item.disabled= true;        
        //console.log(item);
    });
}

function squareRoot() {  
    if(Number(input.value) < 0) return input.value = 'There is no!'  
    if(Number(input.value) == 0) return input.value = 0;
    input.value = (Math.sqrt(Number(input.value))).toFixed(DECIMAL);
}

function root() {     
   A = input.value;
   input.value = input.value + 'r';
}

function clearAll() {  
    input.value="";
    A.length=0;   
}

function  delAll() {
    let array=[...input.value];
    array.pop();
    input.value=array.join('');
    if(input.value.length==0) clearAll();   
}