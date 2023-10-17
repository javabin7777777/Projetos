//"use strict";
import buildElements from "./buildingElements.js";
import { eventsButtons } from "./utilities.js";

const input = document.querySelector("#input");// Campo texto .
const div = document.querySelector("#containerButton");// div dos 'buttons'.
//Inicialização do campo texto.
input.value = "";

// Construção dos elementos(botões) da calculadora.
buildElements(div);

// Usada para travar e destravar o 'button' raiz.
export const radical = document.querySelector("#root");// Usada pelas funções root e clearAll.
// Lista com todos 'buttons'.
export const buttons = document.querySelectorAll('button');
//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');//'elements': Lista do tipo NodeList(Não é array) com todos buttons de 0 a 9 .
// Obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements, ...operators];//'buttons' com as classes number e operator1.
//console.log(combined);
//console.log(elements);
//console.log(elements[0]);//<button class="number">0</button>
//console.log(elements[0].nextElementSibling);//<button class="number">1</button>
//console.log(operators);
//console.log(operator1[0].innerText);

// Adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach((item) => {
    item.addEventListener('click', () => input.value += item.innerText);
});

// Adicionar eventos aos 'buttons' da calculadora,para executar as diversas operações.
eventsButtons();