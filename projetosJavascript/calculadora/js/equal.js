import { validation } from "./validate.js";
import obj from "./utilities.js";
import *as utils from "./utilities.js";
import { radical } from "./main.js";

// Executa a operacao ao pressionar o 'button =' .

export default function equalSign() {
    if (input.value.length === 0) return false;
    let str = input.value;   
    let number = 0;

    // Para operação raiz,potencia,e outras operacoes.
    if (validation(str)) {
        str = utils.Clear(str);
        str = str.replaceAll(',','');       

        if (obj.modulo) { // Obtem o resto da divisao de dois inteiros.            
            let x = 0;let y = 0;
            obj.lastOperation = 'Resto de : ' + obj.aux + ' / ' + str;
            x = obj.aux - Math.trunc(obj.aux);
            y = str - Math.trunc(str);
            if( x !== 0 | y !== 0) {
                utils.messageError(obj.message2);
                return false;
            }            
            input.value = obj.aux = obj.aux % str;
            obj.modulo = false;
            return true;
        }

        if (obj.percentage) { // Para operação porcentagem.
            str = eval(str);
            obj.aux = obj.aux / 100;
            obj.lastOperation = obj.aux + ' * ' + str;// Armazenar a última operação.
            if (obj.aux < 0 || str < 0) {
                utils.messageError(obj.message2);
                obj.percentage = false;
                return false;
            }
            number = Number((obj.aux * str).toFixed(obj.DECIMAL));
            obj.aux = number;// Armazenar o último resultado.
            utils.display(new String(number));
            obj.percentage = false;
            return true;
        }

        /* Para raiz de qualquer número,seja índice ou radicando(radix=true),
            a string de entrada será validada em separado.*/
        
        if (obj.radix) { // Raiz de índice(número) qualquer e radicando(número) qualquer9Relacionado com a função root).
            let str1 = obj.aux;// Radicando.
            let str2 = eval(str);// Indice.
            obj.lastOperation = `Radicando= ${str1} Índice= ${str2}`;// Armazenar  última operação.
            
            // Início da validação das entradas str1 e str2.
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
            obj.aux = number; // Armazenar o último resultado.
            utils.display(new String(number));// Exibir o resultado da operação.
            radical.disabled = false;
            radical.style.background = "lightblue";
            obj.radix = false;
            return true;
        }

        // Para operação potência de qualquer base(número) e qualquer expoente(número).
        if (obj.power) {
            let str1 = obj.aux;// Base.
            let str2 = eval(str);// Expoente.
            obj.lastOperation = str1 + " ** " + str2;// Armazenar para ser exibido como última operação.
            if (str1 < 0) {
                if (str2 % 2 != 0) number = (-1) * Number(eval(Math.abs(str1) + "**" + str2).toFixed(obj.DECIMAL));// Base negativa e expoente ímpar.
                else number = Number(eval(Math.abs(str1) + "**" + str2).toFixed(obj.DECIMAL));// Base negativa e expoente par.
            } else number = Number(eval(str1 + "**" + str2).toFixed(obj.DECIMAL));  // Base positiva e expoente negativo ou positivo.
            obj.aux = number; // Armazenar o resultado da última operação na memória.
            // Exibição do resultado da operação potência.
            if (number == Infinity) {
                utils.messageError(obj.message1);
            } else {
                utils.display(new String(number));
            }
            obj.power = false;

        } else { // Outras operações.
            obj.lastOperation = str; // Armazenar para ser exibido como última operação.  
            if(utils.verificarOperacaoDivisaoPOrZero(str)) {        
                number = Number(eval(str).toFixed(obj.DECIMAL));
                obj.aux = number; // Armazenar o resultado,da última operação,na memória.
                // Exibição do resultado da operação.
                if (number == Infinity) {
                    utils.messageError(obj.message1);                    
                } else {
                    utils.display(new String(number));
                }
            }
        }

    } else {
        obj.lastOperation = str; // Armazenar para ser exibido como última operação.
        return utils.messageError(obj.message0);        
    }
}