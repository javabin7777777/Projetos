
"use strict";
/* inicialização de variáveis */

//var control=false; // valor default
//var aux;
//var tempo;
//var equal=true;
var array=[];
var permit=['0','1','2','3','4','5','6','7','8','9','*','/','+','-','^','sqrt','r'];
var algarism=['0','1','2','3','4','5','6','7','8','9']
var A="";
var  texto1 = "Not a number!";
//var zero = um =0;
const input = document.querySelector("#input");
const div= document.querySelector("#containerButton");
input.value="";
//console.log(div);

//criar os 'buttons' de '0 a 9'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}

//criar os 'buttons' '+,-,*,/,x²,pow,sqrt,root,R,=' .
div.innerHTML = div.innerHTML + '<button class="operator1" >'+'+'+'</button>'+'<button class="operator1">'+'-'+
'</button>';
div.innerHTML = div.innerHTML + '<button class="operator1">'+'*'+'</button>'+'<button class="operator1">'+'/'+
'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="pow2()">'+'x²'+'</button>'+
'<button onclick="pow()">'+'x<sup>y</sup>'+'</button>';
div.innerHTML = div.innerHTML +'<button onclick="squareRoot()">'+'<img src="img/square-root-variable-icon-128.png">'+'</button>'+
'<button  onclick="root()">'+'root'+'</button>'+'<button  onclick="root()">'+'Log'+'</button>'+
'<button  onclick="root()">'+'Ln'+'</button>';
div.innerHTML = div.innerHTML + '<button  onclick="signMinus()">'+'+/-'+'</button>';
div.innerHTML = div.innerHTML +'<button class="operator1">'+'.'+'</button>'+
'<button class="operator1">'+'('+'</button>'+'<button class="operator1">'+')'+'</button>'+
'<button onclick=equalSign()>'+'='+'</button>'+'<button  onclick="clearAll()">'+'CL'+'</button>'+
'<button  onclick="window.location.reload()">'+'R'+'</button>';

console.log(div);
const buttons = document.querySelectorAll('button');
console.log('buttons: ');
console.log(buttons);
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');//'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
//obter os 'buttons' '+,-,*,/' e insere na lista operator1 .
const operator1 = document.querySelectorAll('.operator1');

console.log(elements);
//console.log(elements[0]);//<button class="number">0</button>
//console.log(elements[0].nextElementSibling);//<button class="number">1</button>
//console.log(operator1);
//console.log(operator1[0].innerText);

//adicionar eventos aos 'buttons' de 0 a 9 .
elements.forEach( (item) => {
    item.addEventListener('click',() => {
        array.push(item.innerText);
        input.value = input.value + item.innerText;
    });
    console.log(item);//<button class="number">0</button>
    //console.log(item.innerText);
});

//adicionar eventos aos 'buttons' '+,-,*,/' e obtém o primeiro operando .
operator1.forEach( (item) => {
    item.addEventListener('click',() => {
        array.push(item.innerText);
        //A=input.value; // primeiro operando .
        input.value = input.value + item.innerText;
    });
    //console.log(item);//<button class="operator1">+</button> 
});

function pow2() {
    // validação da entrada .
    for(let i of input.value){
        if(!algarism.includes(i)){
            input.value = 'Not a number!'.toUpperCase();
            lock();
            return false;
        } 
    }   
    if(input.value == 0) return input.value = 0;
    let num=(Math.pow(Number(input.value),2)).toFixed(4);
    array.length=0;//para caso o 'button =' for pressionado .
    if (num==Infinity){
        input.value = 'OverLoad'.toUpperCase();
        lock();
        return false;       
    }
    else input.value = num;       
}
function pow() {
    //if(typeof(input.value) != 'number') return input.value = 'Not a number!';
    //A = input.value; // obtém o primeiro operando .
    //console.log('A= '+A);
    array.length=0;

    array.push(input.value+'**');
    input.value=input.value+'^';
    // = input.value + '^';
    //console.log('A-> '+A); 
   //console.log(input.value);
    //input.value = input.value+'pow';
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

//executa a operação ao pressionar o 'button =' .
function equalSign() {  
//console.log('A: '+A); 
    const decimal=10;
    if(input.value != 'OverLoad') input.value = eval(array.join('')).toFixed(decimal);    
}
 
//desabilta o campo texto e os 'buttons' exceto 'button R' .
function lock() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.disabled = true;
    buttons.forEach((item)=>{
        console.log(item);
        if(!(item.innerText == 'R')) item.disabled= true;        
        console.log(item);
    });
}

function clearAll() {
   // console.log("clearAll");
    input.value="";
    array.length=0;   
}

// validação da expressão entrada .
function validation() {
    for(let i of input.value){
        if(!Permit.includes(i)){
            return false;
        }
    }
    return true;
} 

// validação da expressão entrada .
function validation() {
    for(let i of input.value){
        if(!Permit.includes(i)){
            return false;
        }
    }
    return true;
} 

 /*
  array.length=0;
   
    let B=""; // segundo operando .
    let array1 = [...input.value];
    console.log(array1); // (4) ['8', '^', '-', '2'] 
      
    
    console.log(A.length);
    console.log(array1.indexOf(array1[A.length]) +1);//índice do último operando .
    //obter o segundo operando B .
    for(let i=array1.indexOf(array1[A.length])+1;i<array1.length;i++){
         B=B+array1[i];
    }
    //if(typeof(Number(A))!='number' && typeof(Number(B))!='number') return input.value='Not a number!';
    console.log('A= '+ A);
    console.log('B= '+B);
    console.log(array1[A.length]);
    console.log();
    switch(array1[A.length]){ // selecionar o operador escolhido .
        case '+':input.value = (Number(A)+Number(B)).toFixed(decimal);break;
        case '-':input.value = (Number(A)-Number(B)).toFixed(decimal);break;
        case '*':input.value = (Number(A)*Number(B)).toFixed(decimal);break;
        case '/':input.value = (Number(A)/Number(B)).toFixed(decimal);break;
        case '^':input.value = (eval(A)**eval(B)).toFixed(decimal);break; // potenciação
        case 'r': // raiz (índices inteiros ou decimais,positivos ou negativos) .                 
                    if(Number(A) < 0 ){
                        if(Number(B)%2 != 0){
                            let num = eval(A)*(-1); 
                            input.value = ((num ** (1/eval(B)))*(-1)).toFixed(decimal);    
                        }else input.value = 'There is no!';                      

                    }else input.value = (eval(A) ** (1/eval(B))).toFixed(decimal);                    
                    break;
                   /*


                   
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
   //The Math.fround() static method returns the nearest 32-bit single precision float representation of a number.



function overLoad() {
    input.style.color = "green";
    input.style.fontweight ="bold";
    input.value='OverLoad'.toUpperCase();
    // desabilta o campo texto e os 'buttons' exceto 'button R' .
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
/*
function getB() {
    let B=""; // segundo operando .
    let array1 = [...input.value];
     //obter o segundo operando .
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
*/

/*
function number0(){
     //buttonMinus.setAttribute("disabled",true);
     //buttonPlus.removeAttribute("disabled");
    zero = 0;
    input.value=input.value + zero;
    if(equal){
       A=A.concat(zero.toString());
    }
};
*/



 /*
   console.log(array); 
   console.log(A);
   console.log(B);
   console.log(typeof '+');
   console.log(typeof Number('awesome'));




console.log(div);
calculator.js:19
<div id=​"containerButton">​…​</div>​

const elements = document.querySelectorAll('button');
//lista 'elements' : traz todos buttons em uma lista tipo NodeList.Não é array.
console.log(elements);
calculator.js:23
 NodeList(15) [button, button, button, button, button, button, button, button,
 button, button, button, button, button, button, button]0: button1: button2: button3: button4: 
 button5: button6: button7: button8: button9: button10: button11: button12: button13: button14: 
buttonlength: 15[[Prototype]]: NodeListentries: ƒ entries()forEach: ƒ forEach()item: ƒ item()keys: ƒ keys()length: (...)values: ƒ values()constructor: ƒ NodeList()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.toStringTag): "NodeList"get length: ƒ length()[[Prototype]]: Object

calculator.js:24 <button onclick=​"equalSign()​">​=​</button>​

let all=elements.entries();
// cada elemento de 'all' é um array,e este array tem dois elementos,o primeiro(0) é posição da lista 
// 'elements',segundo(1) é o elemento da lista 'elements' 
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
0: 141: buttonaccessKey: ""ariaAtomic: nullariaAutoComplete: nullariaBrailleLabel: nullariaBrailleRoleDescription: nullariaBusy: nullariaChecked: nullariaColCount: nullariaColIndex: nullariaColSpan: nullariaCurrent: nullariaDescription: nullariaDisabled: nullariaExpanded: nullariaHasPopup: nullariaHidden: nullariaInvalid: nullariaKeyShortcuts: nullariaLabel: nullariaLevel: nullariaLive: nullariaModal: nullariaMultiLine: nullariaMultiSelectable: nullariaOrientation: nullariaPlaceholder: nullariaPosInSet: nullariaPressed: nullariaReadOnly: nullariaRelevant: nullariaRequired: nullariaRoleDescription: nullariaRowCount: nullariaRowIndex: nullariaRowSpan: nullariaSelected: nullariaSetSize: nullariaSort: nullariaValueMax: nullariaValueMin: nullariaValueNow: nullariaValueText: nullassignedSlot: nullattributeStyleMap: StylePropertyMap {size: 0}attributes: NamedNodeMap {0: onclick, onclick: onclick, length: 1}autocapitalize: ""autofocus: falsebaseURI: "file:///C:/POOJava/JavaScript/Desafio_JavaScript/project_calculator/calculator.html"childElementCount: 0childNodes: NodeList [text]children: HTMLCollection []classList: DOMTokenList [value: '']className: ""clientHeight: 50clientLeft: 0clientTop: 0clientWidth: 50contentEditable: "inherit"dataset: DOMStringMap {}dir: ""disabled: falsedraggable: falseelementTiming: ""enterKeyHint: ""firstChild: textfirstElementChild: nullform: nullformAction: "file:///C:/POOJava/JavaScript/Desafio_JavaScript/project_calculator/calculator.html"formEnctype: ""formMethod: ""formNoValidate: falseformTarget: ""hidden: falseid: ""inert: falseinnerHTML: "="innerText: "="inputMode: ""isConnected: trueisContentEditable: falselabels: NodeList []lang: ""lastChild: textlastElementChild: nulllocalName: "button"name: ""namespaceURI: "http://www.w3.org/1999/xhtml"nextElementSibling: nullnextSibling: nullnodeName: "BUTTON"nodeType: 1nodeValue: nullnonce: ""offsetHeight: 50offsetLeft: 436offsetParent: bodyoffsetTop: 515offsetWidth: 50onabort: nullonanimationend: nullonanimationiteration: nullonanimationstart: nullonauxclick: nullonbeforecopy: nullonbeforecut: nullonbeforeinput: nullonbeforematch: nullonbeforepaste: nullonbeforexrselect: nullonblur: nulloncancel: nulloncanplay: nulloncanplaythrough: nullonchange: nullonclick: ƒ onclick(event)onclose: nulloncontentvisibilityautostatechange: nulloncontextlost: nulloncontextmenu: nulloncontextrestored: nulloncopy: nulloncuechange: nulloncut: nullondblclick: nullondrag: nullondragend: nullondragenter: nullondragleave: nullondragover: nullondragstart: nullondrop: nullondurationchange: nullonemptied: nullonended: nullonerror: nullonfocus: nullonformdata: nullonfullscreenchange: nullonfullscreenerror: nullongotpointercapture: nulloninput: nulloninvalid: nullonkeydown: nullonkeypress: nullonkeyup: nullonload: nullonloadeddata: nullonloadedmetadata: nullonloadstart: nullonlostpointercapture: nullonmousedown: nullonmouseenter: nullonmouseleave: nullonmousemove: nullonmouseout: nullonmouseover: nullonmouseup: nullonmousewheel: nullonpaste: nullonpause: nullonplay: nullonplaying: nullonpointercancel: nullonpointerdown: nullonpointerenter: nullonpointerleave: nullonpointermove: nullonpointerout: nullonpointerover: nullonpointerrawupdate: nullonpointerup: nullonprogress: nullonratechange: nullonreset: nullonresize: nullonscroll: nullonsearch: nullonsecuritypolicyviolation: nullonseeked: nullonseeking: nullonselect: nullonselectionchange: nullonselectstart: nullonslotchange: nullonstalled: nullonsubmit: nullonsuspend: nullontimeupdate: nullontoggle: nullontransitioncancel: nullontransitionend: nullontransitionrun: nullontransitionstart: nullonvolumechange: nullonwaiting: nullonwebkitanimationend: nullonwebkitanimationiteration: nullonwebkitanimationstart: nullonwebkitfullscreenchange: nullonwebkitfullscreenerror: nullonwebkittransitionend: nullonwheel: nullouterHTML: "<button onclick=\"equalSign()\">=</button>"outerText: "="ownerDocument: documentparentElement: div#containerButtonparentNode: div#containerButtonpart: DOMTokenList [value: '']prefix: nullpreviousElementSibling: buttonpreviousSibling: buttonrole: nullscrollHeight: 50scrollLeft: 0scrollTop: 0scrollWidth: 50shadowRoot: nullslot: ""spellcheck: truestyle: CSSStyleDeclaration {accentColor: '', additiveSymbols: '', alignContent: '', alignItems: '', alignSelf: '', …}tabIndex: 0tagName: "BUTTON"textContent: "="title: ""translate: truetype: "submit"validationMessage: ""validity: ValidityState {valueMissing: false, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}value: ""virtualKeyboardPolicy: ""willValidate: true[[Prototype]]: HTMLButtonElement(...)length: 2[[Prototype]]: Array(0)


//console.log(div);

const buttoMenos= document.querySelector("#buttonMenos");
//console.log(parseInt(num.value,10));
function cronous(){
    // console.log(num.value);    
    let numero = ['0','1','2','3','4','5','6','7','8','9','-']; // caracteres aceitos na entrada   
    // console.log(numero);    
    let array=[];                  
    array=(num.value).split(""); // correponde o valor de entrada 
        //console.log(array);
    if ( validacao(array,numero) ){ //validação do valor de entrada  
        aux=0;   
        tempo=Math.abs(parseInt(num.value));                
        if (tempo != 0){
            if(control) num.value=0;// insere o valor zero para contagem progressiva
            else aux=num.value; //guarda o valor de  entrada em 'aux' para repetir a contagem regressiva como o mesmo valor
            let id=setInterval(function(){           
                //console.log('tempo '+tempo);

                    if (control){ // contagem progressiva
                        //num.value=aux;                           
                        ++aux;
                        num.value=aux;                                  
                        if(tempo == aux) clearInterval(id); 

                    }else { // contagem regressiva
                        --tempo;
                        num.value = tempo;
                        if(tempo == 0) clearInterval(id);              
                    }

                    //console.log(tempo)
            },1000);
        }else num.value=texto1;
    }else num.value=texto2;
    
}

function mais(){  //defini contagem progressiva
    control=true;
}

function menos() { // defini contagem regressiva,que é a default
    control=false;    
    if(num.value == 0) num.value = aux;//insere o valor novamente para repetir contagem regressiva
}

function validacao(array,numero) {
    if(array.length != 0){        
        //verificar se a entrada é um número
        for (let i=0;i<array.length;i++){ 
        //verificar se o sinal de menos '-' é único ,e,é o primeiro caracter do valor entrado
            console.log(array.indexOf('-',i));
            if(array.indexOf('-',i) != 0){
                return false;
            }else{ // verificar os outros caracteres de entrada,que só podem ser números
                if(!numero.includes(array[i])){ 
                    return false;
                }
            }
        }
    }else return false;

    return true; // retorna true se passar na validação
}
  
        
        //console.log(bol);
        //console.log(typeof(parseInt(num.value,10)));
//num.setAttribute("disable",true);
//num.removeAttribute("disable");
          
            //console.log(num.value); 


     if(i!=0 & array[i] == '-'){
                return false;
            }else{ // verificar os outros caracteres de entrada,que só podem ser números
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