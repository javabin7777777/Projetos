import { buildElements } from "./buildingElements.js";
import { validation } from "./validate.js";
import obj from "./utilities.js";
import * as utils from "./utilities.js";

const input = document.querySelector("#input");// Campo texto .
const div = document.querySelector("#containerButton");// div dos 'buttons'.
//Inicialização do campo texto.
input.value = "";

// Construção dos elementos(botões) da calculadora.
buildElements(div);

// Usada para travar e destravar o 'button' raiz.
export const radical = document.querySelector("#root");// Usada pelas funções root e clearAll.

export const buttons = document.querySelectorAll('button');// Lista com todos 'buttons'.

//obter os 'buttons' de 0 a 9 e insere na lista elements .
const elements = document.querySelectorAll('.number');
// Obter os 'buttons' '+,-,*,/,.,(,)' e insere na lista operators .
const operators = document.querySelectorAll('.operator1');
const combined = [...elements, ...operators];//'buttons' com as classes number e operator1.
// Adicionar eventos aos 'buttons' com as classes number e operator1.
combined.forEach((item) => {
    item.addEventListener('click', () => input.value += item.innerText);
});

// Adicionar eventos aos 'buttons' da calculadora,para executar as diversas operações.
utils.eventsButtons();

//Adicionar evento à função equalSign.
document.getElementById('equal').addEventListener('click', () => equalSign());

// Executa a operação ao pressionar o 'button =' .
function equalSign() {
    if (input.value.length === 0) return false;
    let str = input.value;
    let number = 0;
    // Para operação raiz e potência,e outras operações.
    if (validation(str)) {
        str = str.replaceAll('R$', '');
        str = str.replaceAll(',', '');
        if (obj.modulo) {
            obj.lastOperation = 'Rest of: ' + obj.aux + '/' + str;
            input.value = obj.aux = Math.trunc(Math.abs(obj.aux)) % Math.trunc(Math.abs(str));
            obj.modulo = false;
            return true;
        }

        if (obj.percentage) { // Para operação porcentagem.
            str = eval(str);
            obj.aux = obj.aux / 100;
            obj.lastOperation = obj.aux + ' * ' + str;// Armazena a última operação.
            if (obj.aux < 0 || str < 0) {
                utils.messageError(obj.message2);
                obj.percentage = false;
                return false;
            }
            number = Number((eval(obj.aux * str)).toFixed(obj.DECIMAL));
            obj.aux = number;// Armazena o último resultado.
            utils.display(new String(number));
            obj.percentage = false;
            return true;
        }

        // Para raiz de qualquer número,seja índice ou radicandjobj.radix=true),a string de entrada será validada em separado.
        if (obj.radix) { // Raiz de índice(número) qualquer e radicando(número) qualquer.Relacionado com a função root.
            let str1 = obj.aux;// Radicando.
            let str2 = eval(str);// Índice.
            obj.lastOperation = 'Filing= ' + str1 + 'Index= ' + str2;//Guarda para ser exibido como última operação.
            // Ínicio da validação das entradas str1 e str2.
            number = str2 - Math.trunc(str2);// Índice inteiro.
            let a = str1 > 0;// str1(radicando) poderá ser positivo ou negativo,conforme for str2(c).
            let b = str2 >= 2;// Somente índice maior ou igual a 2.
            let c = str2 % 2 == 0;// Quando for par,str1 deverá ser positivo,caso contrário,str1 pode ser positivo ou negativo.
            let d = number == 0;// str2 deverá ser inteiro.
            // Validação do radicando(str1) e do índice(str2).
            if (!((a && b && d) || (b && (!c) && d))) {
                utils.messageError(obj.message2);
                obj.radix = false;
                return false;
            }
            // Término da validação das entradas str1 e str2.

            // Operação raiz de índice qualquer e radicando qualquer.
            if ((!a) && (!c)) {
                // Radicando negativo e índice ímpar.
                number = (-1) * (Number(((Math.abs(str1)) ** (1 / str2)).toFixed(obj.DECIMAL)));
            } else {
                // Para outros casos.
                number = Number((str1 ** (1 / str2)).toFixed(obj.DECIMAL));
            }
            obj.aux = number; // Armazena o último resultado.
            utils.display(new String(number));// Exibi o resultado da operação.
            radical.disabled = false;
            radical.style.background = "lightblue";
            obj.radix = false;
            return true;
        }

        // Para operação potência de qualquer base(número) e qualquer expoente(número).
        if (obj.power) {
            let str1 = obj.aux;// Base.
            let str2 = eval(str);// Expoente.
            obj.lastOperation = str1 + " ** " + str2;// Guarda para ser exibido como última operação.
            if (str1 < 0) {
                if (str2 % 2 != 0) number = (-1) * Number(eval(Math.abs(str1) + "**" + str2).toFixed(obj.DECIMAL));// Base negativa e expoente ímpar.
                else number = Number(eval(Math.abs(str1) + "**" + str2).toFixed(obj.DECIMAL));// Base negativa e expoente par.
            } else number = Number(eval(str1 + "**" + str2).toFixed(obj.DECIMAL));  // Base positiva e expoente negativo ou positivo.
            obj.aux = number; // Guarda o resultado da última operação na memória.
            // Exibição do resultado da operação potência.
            if (number == Infinity) {
                utils.messageError(obj.message1);
            } else {
                utils.display(new String(number));
            }
            obj.power = false;
        } else { // Outras operações.
            obj.lastOperation = str;// Guarda para ser exibido como última operação.
            number = Number(eval(str).toFixed(obj.DECIMAL));
            obj.aux = number; // Guarda o resultado da última operação na memória.
            // Exibição do resultado da operação.
            if (number == Infinity) {
                utils.messageError(obj.message1);
                obj.aux = input.value;
            } else {
                utils.display(new String(number));
            }
        }
    } else {
        obj.lastOperation = str;// Armazena para ser exibido como última operação.
        utils.messageError(obj.message0);
        return false;
    }
}