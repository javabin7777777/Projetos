'use strict';
let input = document.getElementById('senha-input');
input.style.width = '18rem';
input.disabled = true;
let select = document.getElementById('senha-tamanho-select');
let imagemNumeroBinario = document.getElementById('senha-imagem-principal');
let gerarSenha = document.getElementById('botoes-gerador-senha');
let limpar = document.getElementById('botoes-limpar');

// As funcoes que serão executadas ao pressionar botao ou passar o mouse por cima .
limpar.addEventListener('click', () => Limpar());
select.addEventListener('mouseover', () => {
    select.style.fontWeight = '900';
});
imagemNumeroBinario.addEventListener('mouseover',() => {
    imagemNumeroBinario.src = './img/numero-binario.gif';
});
imagemNumeroBinario.addEventListener('mouseout',() => {
    imagemNumeroBinario.src = './img/numero-binario.jpg';
});
gerarSenha.addEventListener('click', () => {  // Gerador de senha .
    if (Number(select.value == 0)) return;   
    let senha = '';
    let tamanhoSenha = Number(select.value);
    let obj = {
        array: [],
        x: 0
    }
  
    do {
        obj = geradoraNumeroAleatorio(obj);
        senha = senha.concat(String.fromCharCode(obj.x));      
        tamanhoSenha -= 1;
    }
    while (tamanhoSenha > 0)
    input.disabled = false;
    tamanhoTextArea(Number(select.value)); 
    input.style.fontSize = '1.5rem';
    input.style.fontWeight = '750';   
    input.value = senha;   
    input.disabled = true;  
    obj.array.length = 0;
    obj.x = 0;  
});
function Limpar() {
    window.location.reload(true);
}

// Esta funcao e utilizada por gerarSenha .
function geradoraNumeroAleatorio(obj) {   
    for(let i=1;i<301;i++) { // Loop controlado.
        obj.x = Math.round(Math.random() * 126);
        if (obj.array.includes(obj.x)) continue;        
        if (obj.x > 31) {           
            obj.array.push(obj.x);        
            break;
        }
    }
    
    return obj;
}

// Esta funcao altera o tamanho do campo onde é inserido a senha .
function tamanhoTextArea(tamanho) {   
    
    switch(tamanho) {
        case 8: input.style.width = '9rem';break;
        case 16: input.style.width = '16rem';break;
        case 24: input.style.width = '21rem';break;
        case 32: input.style.width = '30rem';break;
        case 40: input.style.width = '35rem';break;
        case 48: input.style.width = '45rem';break;
        case 56: input.style.width = '50rem';break;
        case 64: input.style.width = '56rem';break;
        case 72: input.style.width = '64rem';break;
        case 80: input.style.width = '68rem';break;
        default: input.style.width = '71rem';        
    }  
        
}
