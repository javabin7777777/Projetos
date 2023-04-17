"use strict";

/* inicialização de variáveis */
const DECIMAL=10;
const algarism=['0','1','2','3','4','5','6','7','8','9'];
const operator=['*','/','+','-'];    
const special_O=['(','[','{',];
const special_C=[')',']','}'];
const others=['.','e','E'];
const permit=[...algarism,...operator,...special_O,...special_C,'.','sqrt','radix','e','E'];
console.log(permit);
const input = document.querySelector("#input");//campo texto .
const div= document.querySelector("#containerButton");// div dos 'buttons'.
input.value="";
//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,Log,Ln,+-,.,(,),=,CL,DEL,R'.
div.innerHTML = div.innerHTML+'<button class="operator1" >'+'+'+'</button>'+'<button class="operator1">'+'-'+'</button>';
div.innerHTML = div.innerHTML + '<button class="operator1">'+'*'+'</button>'+'<button class="operator1">'+'/'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="pow2()">'+'x²'+'</button>'+'<button onclick="pow()">'+'x<sup>y</sup>'+'</button>';
div.innerHTML = div.innerHTML +'<button onclick="squareRoot()">'+'<img src="img/square-root-50.png" alt="square root icon ">'+
'</button>'+'<button  onclick="root()">'+'<img src="img/square-root-50-N.png" alt="generic root icon ">'+'</button>'+
'<button  onclick="log()">'+'Log'+'</button>'+'<button  onclick="ln()">'+'Ln'+'</button>'+'<button>'+'sen'+'</button>'+
'<button>'+'cos'+'</button>'+'<button>'+'tag'+'</button>'+'<button>'+'ctag'+'</button>'+'<button>'+'sec'+'</button>'+
'<button>'+'csec'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="signMinus()">'+'+/-'+'</button>'+'<button class="operator1">'+'e'+'</button>'+
'<button class="operator1">'+'E'+'</button>';
div.innerHTML = div.innerHTML +'<button class="operator1">'+'.'+'</button>'+'<button class="operator1">'+
'('+'</button>'+'<button class="operator1">'+')'+'</button>'+'<button onclick=equalSign()>'+'='+'</button>'+
'<button  onclick="clearAll()">'+'CL'+'</button>'+'<button  onclick="delAll()">'+'DEL'+'</button>'+
'<button  onclick="window.location.reload()">'+'R'+'</button>';

const buttons = document.querySelectorAll('button');
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');
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
    if(validation()) {
        let number = Number(eval(input.value).toFixed(DECIMAL));
        if (number==Infinity) {
            input.value = 'OverLoad'.toUpperCase();
            lock();
            return false;       
        }else {
            input.value = number;
            return true;        
        }
    }else nAn();   
}

// validar a string de entrada.
function validation() { 
   // início da verificação preliminar da string de entrada .   
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
            console.log('aqui');
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

                //caso input.value[i] seja número:antes dele pode ser número,ou operador,ou caracter special aberto.
                //caso input.value[i] seja número:depois dele pode ser número,ou operador,ou caracter special fechado.
                before = a || b || c || j;
                after =  e || f || h || k;
                console.log('i= '+i);
                if(algarism.includes(input.value[i])) {
                    console.log('before: '+before);
                    console.log('after: '+after);
                    if(!(before && after)) return false;
                    console.log('passou aqui');
                }

                // caso input.value[i] seja operador:antes dele pode ser número ou special fechado.
                // caso input.value[i] seja operador:depois dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d;
                after =  e || g;
                if(operator.includes(input.value[i])) {
                    console.log('before: '+before);
                    console.log('after: '+after);
                    if(!(before && after)) {
                        if(input.value[i+1]=='*') i+=1;//caso seja os caracteres '**'.
                        else return false;
                        console.log('passou aqui');
                    }
                }

                // caso input.value[i] seja caracter special_O: antes dele pode ser operador e depois pode ser número.
                before =  b;
                after =  e;
                if(special_O.includes(input.value[i])) {
                    console.log('before: '+before);
                    console.log('after: '+after); 
                    if(!(before && after)) return false;
                    console.log('passou aqui');
                }
                // caso input.value[i] seja caracter special_C: antes dele pode ser número e depois pode ser operador.
                before =  a ;
                after =  f;
                if(special_C.includes(input.value[i])) { 
                    console.log('before: '+before);
                    console.log('after: '+after);
                    if(!(before && after)) return false;
                    console.log('passou aqui');
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
    if(input.value == 0) return input.value = 0;
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
    console.log(input.value);
    const permitPow=['0','1','2','3','4','5','6','7','8','9','.','-','e','E','+'];
    if(input.value.length==0){
        nAn();
        return false;
    }  
    // verificar se cada caracter de entrada é permitido .
    for(let i of input.value) {
        if(!(permitPow.includes(i))) { 
            console.log('aqui');
            nAn();
            return false;      
        }
    }
    // verificar se o primeiro caracter é número ou '-.     
    if(!(algarism.includes(input.value[0]) || input.value[0]=='-')) {       
        nAn();
        return false;
    }

    for(let i=0;i<input.value.length;i++) {            
        if(input.value[i] == 'e' || input.value[i] == 'E') {        
            let a=algarism.includes(input.value[i-1]);
            let b=(algarism.includes(input.value[i+1]) || permitPow.includes(input.value[i+1]));  
            console.log(b);  
            console.log(a);               
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

//desabilitar o campo texto e os 'buttons',exceto 'button R' .
function lock() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=>{         
        if(!(item.innerText == 'R')) item.disabled= true; 
    });
}

function squareRoot() {  
    if(Number(input.value) < 0) return input.value = 'There is no'  
    if(Number(input.value) == 0) return input.value = 0;
    input.value = Number( (Number(input.value)**(1/2)).toFixed(DECIMAL) );
}

function root() {     
   input.value = input.value + 'r';
}

function clearAll() {  
    input.value="";     
}

function  delAll() {
    let array=[...input.value];
    array.pop();
    input.value=array.join('');
    if(input.value.length==0) clearAll();   
}