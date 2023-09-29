import { validation, validationPow } from "./validate.js";
import { messageError, display, commaVerification, fatorial } from "./utilities.js";
import obj from "./utilities.js";
import { radical } from "./calculator.js";

// Fornece número de euler,valor de PI,seno,cosseno,tangente,logaritmo obj.DECIMAL,logaritmo neperiano,potência,raiz.
// raiz quadrada,símbolo monetário do Real,porcentagem.
export default function generic(param) {
    let str = input.value;
    if (commaVerification(str)) {
        obj.lastOperation = "Error: " + str;
        messageError(obj.message0);
        return false;
    }
    switch (param) {
        case 'euler':
            input.value = Math.E;
            return true;

        case 'pi':
            input.value = Math.PI;
            return true;

        case 'real':
            let array = [...input.value];
            array.unshift('R$');
            input.value = array.join("");
            return true;

        case 'ctt':
            input.value = "";
            return true;

        case 'pow2':    // Potência de base 2 .
            if (validationPow(str)) { // validação da entrada .
                str = str.replaceAll(',', '');
                obj.lastOperation = 'Base: ' + str;
                str = eval(str);
                let number = Number((str ** 2).toFixed(obj.DECIMAL));
                if (number == Infinity) {
                    messageError(obj.message1);
                    return false;
                } else {
                    obj.aux = number;  // Armazena o último resultado.
                    display(new String(number));
                    return true;
                }
            } else {
                obj.lastOperation = 'Error: ' + 'Base: ' + str;
                messageError(obj.message0);
                return false;
            }
    }

    // Operação seno,cosseno,tangente,logaritmo DECIMAL,logaritmo neperiano,raiz quadrada,porcentagem,potência,
    // inverso e absoluto.
    if (str.length != 0) {
        if (validation(str)) {
            str = str.replaceAll('R$', '');
            str = str.replaceAll(',', '');
            str = eval(str);
            switch (param) {
                case 'sin':
                    input.value = obj.aux = angle(str, 'sin');
                    return true;

                case 'cos':
                    input.value = obj.aux = angle(str, 'cos');
                    return true;

                case 'tan':
                    angle(str, 'tan');
                    return true;

                case 'inv':
                    input.value = obj.aux = 1 / str;
                    obj.lastOperation = '1/' + str;
                    return true;

                case 'abs':
                    input.value = Math.abs(str);
                    return true;

                case 'mod':
                    obj.aux = str;
                    input.value = "";
                    obj.modulo = true;
                    return true;

                case 'squareRoot':  // Raiz quadrada.
                    obj.lastOperation = "Filing: " + str;// Armazerna última operação(radicando).
                    if (str < 0) {
                        messageError(obj.message2);
                        return false;
                    }
                    let number = Number(eval(str + '**(1/2)').toFixed(obj.DECIMAL));
                    obj.aux = number;// Armazena o último resultado.
                    display(new String(number));// Exibi o resultado da operação.
                    return true;

                case 'root': // Raiz de índice qualquer e radicando qualquer.Relacionado com a função equalSign.
                    obj.aux = str;
                    input.value = "";
                    obj.radix = true;
                    //trava o 'button' raiz.
                    radical.style.background = "#867E7D";
                    radical.disabled = true;
                    return true;

                case '%':   // Porcentagem.
                    obj.aux = str;
                    input.value = "";
                    obj.percentage = true;
                    return true;

                case 'pow': // Potência de qualquer base e de qualquer expoente.Relacionado com a função equalSign.
                    obj.aux = str;
                    input.value = "";
                    obj.power = true;
                    return true;

                case 'fatorial':
                    fatorial(str);
                    return true;
            }
            // Operação logaritmo decimal e neperiano.
            if (str > 0) {
                switch (param) {
                    case 'log':
                        input.value = obj.aux = Number(Math.log10(str).toFixed(obj.DECIMAL));
                        obj.lastOperation = "decimal Logarithm  of: " + str;
                        return true;
                    case 'ln':
                        input.value = obj.aux = Number(Math.log(str).toFixed(obj.DECIMAL));
                        obj.lastOperation = "Neperian Logarithm of: " + str;
                        return true;
                }
            } else {
                obj.lastOperation = "Logarithm: " + str;// Armazena a causa do erro.
                messageError(obj.message2);
                return false;
            }

        } else {
            obj.lastOperation = str;// Armazena a causa do erro.
            messageError(obj.message0);
            obj.percentage = false;
            obj.radix = false;
            obj.power = false;
            return false;
        }
    }

}

// Operação seno,cosseno e tangente.
function angle(str, value) {
    str = Math.abs(Number(str));
    let num = str / 90 - Math.trunc(str / 90);  
    let deg = (str * Math.PI) / 180;// Transforma para radianos.   
    switch (value) {
        case 'sin':
            obj.lastOperation = `sin(${deg} radians)`;
            if (num === 0) {
                if ((str / 90) % 2 === 0) { // Se for par o seno é zero.
                    return 0;
                }
            }
            return Math.sin(deg);

        case 'cos':
            obj.lastOperation = `cos(${deg} radians) `;
            if (num === 0) {
                if ((str / 90) % 2 !== 0) { // Se for ímpar o cosseno é zero.
                    return 0;
                }
            }
            return Math.cos(deg);

        case 'tan':
            if (angle(str, 'cos') === 0) {
                messageError(obj.message2);
            } else {
                input.value = obj.aux = angle(str, 'sin') / angle(str, 'cos');
                obj.lastOperation = `tan = sin: ${angle(str, 'sin')} / cos: ${angle(str, 'cos')} `;
            }
    }
}