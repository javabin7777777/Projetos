
/* inicialização de variáveis */

var control=false; // valor default
var aux;
var tempo;
var equal=true;
var A="";
var zero = um =0;
const texto1="Zero,não vale!"; 
const texto2="Não é número!";
const input = document.querySelector("#input");
const div= document.querySelector("#containerButton");
input.value="";
//console.log(div);

//criar os 'buttons' de '0 a 9' e os '+,-,*,/,x²,pow,sqrt,root,R,='
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}
div.innerHTML = div.innerHTML + '<button class="operator" >'+'+'+'</button>'+'<button class="operator">'+'-'+'</button>';
div.innerHTML = div.innerHTML + '<button class="operator">'+'*'+'</button>'+'<button class="operator">'+'/'+'</button>';
div.innerHTML = div.innerHTML + '<button onclick="pow2()">'+'x²'+'</button>'+'<button onclick="pow()">'+'pow'+'</button>';
div.innerHTML = div.innerHTML +'<button onclick="rootSquare()">'+'sqrt'+'</button>'+'<button>'+'root'+'</button>';
div.innerHTML = div.innerHTML + '<button onclick="window.location.reload()">'+'R'+'</button>'+'<button onclick=equalSign()>'+'='+'</button>';
console.log(div);

//listar os 'buttons' de 0 a 9
const elements = document.querySelectorAll('.number');
// listar os operadores
const operator = document.querySelectorAll('.operator');
//'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .

console.log(elements);
//console.log(elements[0]);//<button class="number">0</button>
//console.log(elements[0].nextElementSibling);//<button class="number">1</button>
console.log(operator);
console.log(operator[0].innerText);

//adicionar eventos aos 'buttons' de 0 a 9 .
elements.forEach( (item) => {
    item.addEventListener('click',() => {input.value = input.value + item.innerText;});
    console.log(item);//<button class="number">0</button>
    //console.log(i.innerText);
});

//adicionar eventos aos operadores '+,-,*,/' .
operator.forEach( (item) => {
    item.addEventListener('click',() => {
        A=input.value; // primeiro operando .
        input.value = input.value + item.innerText;
    });
    //console.log(item);//<button class="operator">+</button> 
});

function pow() {
    A = input.value;
    input.value = input.value+'pow';
}
function pow2() {
    if(typeof(input.value) != 'number') return input.value = 'Not a number!'
    if(inpu.value == 0) return input.value = 0;
    input.value = Math.pow(Number(input.value),2).toFixed(4);       
}

function rootSquare() {
    if(typeof(input.value) != 'number') return input.value = 'Not a number!'
    if(input.value < 0) return input.value = 'There is no!'  
    if(inpu.value == 0) return input.value = 0;
    input.value = Math.sqrt(input.value).toFixed(10);
}

//executa a operação escolhida,entre dois operandos A e B .
function equalSign() { 
    const decimal=10;
    let B=""; // segundo operando .
    let array = [...input.value];
    console.log(array);    
    console.log(A.length);
    console.log(array.indexOf(array[A.length])+1);//índice do operador .
    //obter o segundo operando .
    for(let i=array.indexOf(array[A.length])+1;i<array.length;i++){
         B=B+array[i];
    }
    if(typeof(A)!='number' || typeof(B)!='number') return input.value='Not a number!';
    console.log('A= '+ A);
    console.log('B= '+ B);
    console.log(array[A.length]);
    switch(array[A.length]){
        case '+':input.value = (Number(A)+Number(B)).toFixed(decimal);break;
        case '-':input.value = (Number(A)-Number(B)).toFixed(decimal);break;
        case '*':input.value = (Number(A)*Number(B)).toFixed(decimal);break;
        case '/':input.value = (Number(A)/Number(B)).toFixed(decimal);break;
        //case 'pow':input.value = Math.pow(Number(A),Number(B));break;
        //case 'sqrt':input.value = Math.sqrt(Number(A));break;

    }   
    A="";
}



/*
function getB() {
    let B=""; // segundo operando .
    let array = [...input.value];
     //obter o segundo operando .
    for(let i=array.indexOf(array[A.length])+1;i<array.length;i++){
         B=B+array[i];
    } 
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