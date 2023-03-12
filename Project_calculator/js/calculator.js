
"use strict";

/* inicialização de variáveis */

const DECIMAL=10;
const A=[];
const input = document.querySelector("#input");
const div= document.querySelector("#containerButton");
input.value="";

//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,(,)=,CL,DEL,R' .
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

// obter todos os 'buttons' .
const buttons = document.querySelectorAll('button');
//obter os 'buttons' de 0 a 9 .
const elements = document.querySelectorAll('.number');
//obter os 'buttons' '+,-,*,/' .
const operator1 = document.querySelectorAll('.operator1');

//adicionar eventos aos 'buttons' de 0 a 9 .
elements.forEach( (item) => {
    item.addEventListener('click',() => {       
        input.value = input.value + item.innerText;     
    }); 
});

//adicionar eventos aos 'buttons' '+,-,*,/' e obtém o primeiro operando .
operator1.forEach( (item) => {
    item.addEventListener('click',() => {        
        input.value = input.value + item.innerText;
    });
});

//potência de 2 .
function pow2() {
    if(validation2()){
        if(input.value == 0) return input.value = 0;
        let num=Number((Math.pow(Number(input.value),2)).toFixed(DECIMAL));
        array.length=0;//para caso o 'button =' for pressionado .
        if (num==Infinity){
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
    array.length=0;//para caso o 'button =' for pressionado .
    array.push(input.value+'**');
    input.value=input.value+'^';    
}

// raiz quadrada
function squareRoot() {  
    if(input.value < 0) return input.value = 'There is no!'  
    if(input.value == 0) return input.value = 0;
    input.value = (Math.sqrt(Number(input.value))).toFixed(10);
}

// raiz de índice qualquer
function root() {    
   A = input.value;
   input.value = input.value + 'r';
}

//executa a operação ao pressionar o 'button =' .
function equalSign() {     
    if(validation()) input.value = eval(A.join('')); 
    A.length=0;   
}

function validation() {
    const permit=['0','1','2','3','4','5','6','7','8','9','.','*','/','+','-','^','sqrt',
                  'radix','e','E','(',')'];
    const algarism=['0','1','2','3','4','5','6','7','8','9'];

    if (input.value.length < 3) {
        nAn();
        return false;
    }    
    for(let i of input.value) {
        if(permit.includes(i)) { // verificar se cada caracter é permitido .
            if (A.includes(i)) { // verificar se existe caracter é repetido,exceto número .
                if(!(algarism.includes(i))) {
                    nAn();
                    return false;
                }
            }
            A.push(i);// entrada filtrada,e será usada para o cálculo .

        }else{
            nAn();
            return false; 
        }                   
    }
    console.log('A= '+A);
    return true;// passou
}

function nAn() {
    input.value = 'not a number'.toUpperCase();
    lock();
}

//desabilitar o campo texto e os 'buttons' exceto 'button R' .
function lock() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=>{ //desabilitar os 'buttons' exceto o 'button R' .       
        if(!(item.innerText == 'R')) item.disabled= true;      
    });
}

function clearAll() {
   // console.log("clearAll");
    input.value="";
    array.length=0;   
}

// validar a expressão entrada para pow2 .
function validation2() {
    console.log(input.value);
    let q=console.log(Number(input.value));
    if(q == NaN) return console.log('not a number');
    let permit=['0','1','2','3','4','5','6','7','8','9','.','-']; 
    let ar=[...input.value];

    console.log(ar);
    let filter=ar.filter(element => element === 'e' || element === 'e'.toUpperCase() || element === '+');
    console.log(filter); 
    for(let i of input.value) {
        if(!permit.includes(i)) { 
            if(!filter.includes(i)){
                 
            }
        } 
    }

    return true;
} 
