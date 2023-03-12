
"use strict";
/* inicialização de variáveis */

//var control=false; // valor default
//var aux;
//var tempo;
//var equal=true;
const DECIMAL=10;
//const array=[];
const A=[];
//const  text = "not a number!";
//var zero = um =0;
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

console.log(div);
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
    if(validation()) input.value = (eval(A.join(''))).toFixed(DECIMAL); 
    A.length=0;
    console.log('A= '+A);
}

// validar a expressão entrada .
// saída é a variável A,usada para o cálculo .
function validation() {
    const permit=['0','1','2','3','4','5','6','7','8','9','.','*','/','+','-','^','sqrt','radix',
                  '(',')','[',']','{','}','e','E'];
    const algarism=['0','1','2','3','4','5','6','7','8','9'];
    const especials=['(',')','[',']','{','}'];
    let begin = input.value.charAt(0);
    console.log(input.value.charAt(0));
    // string de entrada com tamanho menor que três ou início da string não é um número .
    if ( (input.value.length < 3) || ( !(algarism.includes(begin)) && !(especials.includes(begin)) ) ) {       
        nAn();
        return false;            
    }

    for(let i of input.value) {
        if(permit.includes(i)) { // verificar se cada caracter é permitido .
            if (A.includes(i)) { // verificar se existe caracter repetido,exceto número .
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

//potência de 2 .
function pow2() {
    console.log(A);
    if(input.value == 0) return input.value = 0;
    if(validationPow2()) {        
        let num=(Number((Math.pow(Number(A.join('')),2)))).toFixed(DECIMAL);
        A.length=0;//para a próxima operação,e caso o 'button =' for pressionado .
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
    //if(typeof(input.value) != 'number') return input.value = 'Not a number!';
    //A = input.value; // obtém o primeiro operando .
    //console.log('A= '+A);
    array.length=0;//para caso o 'button =' for pressionado .
    array.push(input.value+'**');
    input.value=input.value+'^';
    // = input.value + '^';
    //console.log('A-> '+A); 
   //console.log(input.value);
    //input.value = input.value+'pow';
}
// validar a expressão entrada para pow2 .
// saída é a variável A,usada para o cálculo .
function validationPow2() {
    console.log(input.value);       
    let permit=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+']; 
    const algarism=['0','1','2','3','4','5','6','7','8','9'];
    if(!(algarism.includes(input.value.charAt(0)))){// verificar se o primeiro caracter é número .
        nAn();
        return false;
    }
   // A=[...input.value];
   // console.log(A);
    for(let i of input.value){
        if(!((i == 'e' || i == 'E') && (input.value.length>2))){ //entrada '2e' ou '2e'
             nAn();
            return false;
        }
    }
    for(let i of input.value) {
        if(permit.includes(i)) { // verificar se cada caracter é permitido .
            if (A.includes(i)) { // verificar se existe caracter repetido,exceto número .
                if(!(algarism.includes(i))) {
                    nAn();
                    return false;
                }
            }
            A.push(i);// entrada filtrada,e será usada para o cálculo .
            console.log(A);

        }else{
            nAn();
            return false; 
        }                   
    }
    console.log('A= '+A);
    return true;// passou
}

function squareRoot() {
   // if(typeof(input.value) != 'number') return input.value = 'Not a number!';
    if(input.value < 0) return input.value = 'There is no!'  
    if(input.value == 0) return input.value = 0;
    input.value = (Math.sqrt(Number(input.value))).toFixed(10);
}

function root() {
   //if(validation()) return input.value = 'Not a number!';   
   A = input.value;
   input.value = input.value + 'r';  

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
        //console.log(item);
        if(!(item.innerText == 'R')) item.disabled= true;        
        //console.log(item);
    });
}

function clearAll() {
   // console.log("clearAll");
    input.value="";
    A.length=0;   
}
