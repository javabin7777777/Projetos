"use strict";
let mensagem = `Caracteres permitidos: 
espaco,a-z,0-9,[,],+,-,%,$,#,@,!,?, . , : , ; ,\`, , ,^,-,<,>,=,\\,&,*,(,),\",',/,{,},|,~` ;

let resultado = document.getElementById('criptografado-resultado');
resultado.style.display = "none";
let criptografado = document.getElementById('criptografado');
let criptografadoImagemDaJovemComLupa = document.getElementById('criptografado-imagemDaJovemComLupa');
let input = document.getElementById('texto-entrada-input');
let botaoLimpar = document.getElementById('botoes-limpar');
let botaoCriptografar = document.getElementById('botoes-criptografar');
let botaoDescriptografar = document.getElementById('botoes-descriptografar');
let botaoCopiar = document.getElementById('criptografado-botao-copiar');
botaoCopiar.style.display = 'none';

//Adicionar eventos aos botoes limpar,criptografar,descriptografar e copiar .
botaoLimpar.addEventListener('click', () => limpar());
botaoCriptografar.addEventListener('click', () => criptoDescripto(input));
botaoDescriptografar.addEventListener('click', () => criptoDescripto(input, false));
botaoCopiar.addEventListener('click', () => copiar());

// As funções que serão executadas ao acionar os botoes: limpar, criptografar,descriptografar e copiar.
function limpar() {
    input.disabled = false;
    botaoCriptografar.disabled = false;
    botaoDescriptografar.disabled = false;
    botaoCopiar.disabled = false;
    resultado.disabled = false;
    resultado.style.color = null;
    resultado.style.fontWeight = null;
    input.value = '';
    resultado.value = '';
}

function criptoDescripto(input, criptoDes = true) {
    if (input.value.length === 0) return;
    if (criptoDes) {
        if (verificarTextoDigitado(input)) {  // criptografar o texto digitado .            
            let auxiliarEncripto = '';
            let texto = input.value;
            texto = texto.toLowerCase();
            for (let i = 0; i < texto.length; i++) {
                auxiliarEncripto = auxiliarEncripto.concat(String.fromCodePoint(texto.codePointAt(i) + 5));
            }
            apresentarResultado(auxiliarEncripto);

        } else {
            apresentarResultadoError(); 
        }

    } else {  // descriptografar o texto digitado .             
        let auxiliarDescripto = '';
        let texto = input.value;
        for (let i = 0; i < texto.length; i++) {
            auxiliarDescripto = auxiliarDescripto.concat(String.fromCodePoint(texto.codePointAt(i) - 5));
        }
        apresentarResultado(auxiliarDescripto);
    }
}

function verificarTextoDigitado(input) {
    let texto = input.value;
    for (let i = 0; i < texto.length; i++) {
        if ((texto.codePointAt(i) > 64 && texto.codePointAt(i) < 91)) return false; // letras maiúsculas nao sao permitidas .
        if (!(texto.codePointAt(i) > 31 && texto.codePointAt(i) < 127)) return false; // caracteres não permitidos.
    }
    return true;
}

function apresentarResultado(params) {
    botaoCopiar.style.display = null;
    criptografadoImagemDaJovemComLupa.style.display = "none";
    resultado.style.display = null;
    resultado.value = params;
}

function apresentarResultadoError() {    
    botaoCriptografar.disabled = true;
    botaoDescriptografar.disabled = true;
    botaoCopiar.disabled = true;   
    criptografadoImagemDaJovemComLupa.style.display = "none";
    resultado.style.display = null;
    botaoCopiar.style.display = null;
    resultado.style.color = '#ffabcd';
    resultado.style.fontWeight = '700';
    resultado.value = '\n\n Olhe o que você digitou: \n\n '.concat(input.value);
    resultado.disabled = true;
    input.value = mensagem;
    input.disabled = true;
}

function copiar() {
    input.value = resultado.value;
    //resultado.value= '';
}