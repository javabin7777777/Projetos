/* inicialização de variáveis */
var A=""; //primeiro operando
var zero = um =0;
const texto1="Zero,não vale!"; 
const texto2="Não é número!";
const input = document.querySelector("#input");
const div= document.querySelector("#containerButton");
input.value="";

//criar os 'buttons' de '0 a 9' e os '+,-,*,/,x²,pow,sqrt,root,R,='
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}
div.innerHTML = div.innerHTML + '<button class="operator" >'+'+'+'</button>'+'<button class="operator">'+'-'+'</button>';
div.innerHTML = div.innerHTML + '<button class="operator">'+'*'+'</button>'+'<button class="operator">'+'/'+'</button>';
div.innerHTML = div.innerHTML + '<button>'+'x²'+'</button>'+'<button>'+'pow'+'</button>'+'<button>'+'sqrt'+'</button>'+ '<button>'+'root'+'</button>';
div.innerHTML = div.innerHTML + '<button>'+'R'+'</button>'+'<button onclick=equalSign()>'+'='+'</button>';

//listar os 'buttons' de 0 a 9 .
const elements = document.querySelectorAll('.number');
//listar os operadores
const operator = document.querySelectorAll('.operator');

//adicionar eventos aos buttons '0 a 9' .
elements.forEach( (item) => {
    item.addEventListener('click',() => {input.value = input.value + item.innerText;});
});

//adicionar eventos aos operadores .
operator.forEach( (item) => {
    item.addEventListener('click',() => {
        A=input.value; //primeiro operando
        input.value = input.value + item.innerText;
    });    
});

//executa a operação escolhida,entre dois operandos A e B .
function equalSign() { 
    let B=""; //segundo operando .
    let array = [...input.value]; 
    //obter o segundo operando .   
    for(let i = array.indexOf(array[A.length])+1; i < array.length; i++){
         B=B+array[i];
    } 
    switch(array[A.length]){
        case '+':input.value = Number(A)+Number(B).toFixed(10);break;
        case '-':input.value = Number(A)-Number(B).toFixed(10);break;
        case '*':input.value = Number(A)*Number(B).toFixed(10);break;
        case '/':input.value = (Number(A)/Number(B)).toFixed(10);break;
    }   
    A="";
}