/* inicialização de variáveis */
var A="";
var zero = um =0;
const texto1="Zero,não vale!"; 
const texto2="Não é número!";
const input = document.querySelector("#input");
const div= document.querySelector("#containerButton");
input.value="";
//console.log(div);
//criar os buttons de '0 a 9' e os '+,-,*,/'
for (let i = 0; i < 10; i++) {
    div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
}
div.innerHTML = div.innerHTML + '<button class="operacao" >'+'+'+'</button>'+'<button class="operacao">'+'-'+'</button>';
div.innerHTML = div.innerHTML + '<button class="operacao">'+'*'+'</button>'+'<button class="operacao">'+'/'+'</button>';
div.innerHTML = div.innerHTML + '<button onclick=equalSign()>'+'='+'</button>';
//console.log(div);
//listar os 'buttons' de 0 a 9
const elements = document.querySelectorAll('.number');
// listar os operadores
const operacoes = document.querySelectorAll('.operacao');
//console.log(elements);
//console.log(operacoes);
console.log(operacoes[0].innerText);//adicionar eventos aos 'buttons' de 0 a 9 .
elements.forEach( (item) => {
    item.addEventListener('click',() => {input.value = input.value + item.innerText;});
    //console.log(item);
    
});
//adicionar eventos aos 4 operadores
operacoes.forEach( (item) => {
    item.addEventListener('click',() => {
        A=input.value; // primeiro operando .
        input.value = input.value + item.innerText;
    });
    //console.log(item); 
});

// executa a operação escolhida,entre dois operandos A e B .
function equalSign() { 
    let B=""; // segundo operando .
    let array = input.value.split("");    
    for(let i = array.indexOf(array[A.length])+1; i < array.length; i++){
         B=B+array[i];
    } 
    switch(array[A.length]){
        case '+':input.value = Number(A)+Number(B).toFixed(10);break;
        case '-':input.value = Number(A)-Number(B).toFixed(10);break;
        case '*':input.value = Number(A)*Number(B).toFixed(10);break;
        case '/':input.value = (Number(A)/Number(B)).toFixed(10);break;
    }   
    A="";B="";
}