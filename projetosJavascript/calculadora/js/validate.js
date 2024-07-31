import { Clear, commaVerification, verificarOctal } from "./utilities.js";
import obj from "./utilities.js";

// Validar a string de entrada.
function validation(str) {
    // Inicio da verificacao preliminar da string de entrada.   

    if (str.length === 0) return false;// String vazia.  

    //Verificar se as vírgulas separam os milhares corretamente.
    if (commaVerification(str)) return false;

    str = Clear(str);   

    // Verificar se e numero octal.
    if (verificarOctal(str)) return false;

    //contagem dos caracteres special_O e special_C.
    let counter_O = 0;// quantidade de caracteres special_O.
    let counter_C = 0;// quantidade de caracteres special_C.
    for (let i = 0; i < str.length; i++) {
        if (obj.special_O.includes(str[i])) ++counter_O;
        else {
            if (obj.special_C.includes(str[i])) ++counter_C;
        }
    }

    if (counter_O === counter_C) {

        let begin = str[0];
        let end = str[str.length - 1];
        let a = str.length > 0;
        let b = obj.algarism.includes(begin) || obj.special_O.includes(begin) || begin === '-';
        let c = obj.algarism.includes(end) || obj.special_C.includes(end) || begin === '+';
        let d; let e; let f; let g; let h; let j; let k; let before; let after;

        // String de entrada com tamanho maior que dois.
        // Iniciar com número ou um dos caracteres 'obj.special_O','+',ou '-'.
        // Finalizar com número ou com um dos caracteres 'obj.special_C'.        
        if (((!a) && (b && c))) return false;// 'String' de entrada não validada.


        // Verificar se string de entrada está no formato numero+obj.operator+numero ...
        // e com os caracteres obj.special_O e obj.special_C.
        // Percorre toda a string validando caracter por caracter.
        for (let i = 1; i < str.length; i++) {
            if (i !== str.length - 1) {
                a = obj.algarism.includes(str[i - 1]);
                b = obj.operator.includes(str[i - 1]);
                c = obj.special_O.includes(str[i - 1]);
                d = obj.special_C.includes(str[i - 1]);
                j = obj.others.includes(str[i - 1]);

                e = obj.algarism.includes(str[i + 1]);
                f = obj.operator.includes(str[i + 1]);
                g = obj.special_O.includes(str[i + 1]);
                h = obj.special_C.includes(str[i + 1]);
                k = obj.others.includes(str[i + 1]);

                // Caso str[i] seja número:antecessor dele pode ser número,ou operador,ou caracter special aberto,ou caracteres obj.others.
                // Caso str[i] seja número:sucessor dele pode ser número,ou operador,ou caracter special fechado,ou caracteres obj.others.
                before = a || b || c || j; // Antecessor do caracters str[i];
                after = e || f || h || k; // Sucessor do caracter str[i];
                if (obj.algarism.includes(str[i])) {
                    if (!(before && after)) return false;
                }

                // Caso str[i] seja operador: Antecessor dele pode ser número ou special fechado ou caracteres obj.others.
                // Caso str[i] seja operador: Sucessor dele pode ser número ou special aberto,exceto para o operador '**'.
                before = a || d || j;
                after = e || g;
                if (obj.operator.includes(str[i])) {
                    if (!(before && after)) {
                        if (str[i + 1] == '*') i += 1; // Caso seja os caracteres '**'.
                        else return false;
                    }
                }

                // Caso str[i] seja um dos caracteres 'e' ou 'E'.
                // Antecessor deve ser número.
                // Sucessor deve ser número ou caracter '-'.
                before = a;
                after = e || str[i] == '-';
                if (str[i] == 'e' || str[i] == 'E') {
                    if (!(before && after)) return false;
                }

                // Caso str[i] seja caracter obj.special_O:
                // Antecessor deve ser operador.
                // Sucessor deve ser número.
                before = b;
                after = e;
                if (obj.special_O.includes(str[i])) {
                    if (!(before && after)) return false;
                }
                // Caso str[i] seja caracter obj.special_C:
                // Antecessor pode ser número.
                // Sucessor pode ser operador.
                before = a;
                after = f;
                if (obj.special_C.includes(str[i])) {
                    if (!(before && after)) return false;
                }
            } else {
                // último caracter da string de entrada.               
                if (!(obj.algarism.includes(str[i]) || obj.special_C.includes(str[i]))) return false;
            }
        }
    } else return false;

    return true; // String de entrada validada.
}

// Validação da string de entrada,que é usada pela função pow2.
function validationPow(str) {
    // Se a String de entrada for vazia.
    if (!(str.length !== 0)) return false;
    str = str.replaceAll(',', '');

    // Verificar se o primeiro caracter é número ou '-'.
    if (!(obj.algarism.includes(str[0]) || str[0] === '-')) {
        return false;
    }

    // Verificar cada caracter de entrada.
    for (let i of str) {
        if (!(obj.permitPow.includes(i))) {

            return false;
        }
    }

    // Para caracter e ou E (notação científica). 
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'e' || str[i] === 'E') {
            let a = obj.algarism.includes(str[i - 1]); // antecessor
            let b = (obj.algarism.includes(str[i + 1]) || obj.permitPow.includes(str[i + 1])); // sucessor
            if (!(a && b)) {
                return false;
            }
        }
    }
    return true;// Passou.
}

export { validation, validationPow };

