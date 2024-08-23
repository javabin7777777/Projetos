'use strict';
let input = document.getElementById('senha-input');
input.style.width = '18rem';
input.disabled = true;
let tamanhoSenhaInput = document.getElementById('senha-tamanho-input');
let imagemNumeroBinario = document.getElementById('senha-imagem-principal');
let gerarSenha = document.getElementById('botoes-gerador-senha');
let limpar = document.getElementById('botoes-limpar');

// As funcoes que serão executadas ao pressionar botao ou passar o mouse por cima .
limpar.addEventListener('click', () => Limpar());
imagemNumeroBinario.addEventListener('mouseover', () => {
    imagemNumeroBinario.src = './img/numero-binario.gif';
});
imagemNumeroBinario.addEventListener('mouseout', () => {
    imagemNumeroBinario.src = './img/numero-binario.jpg';
});
gerarSenha.addEventListener('click', () => {  // Gerador de senha .
       
    if (Number(tamanhoSenhaInput.value > 7 && Number(tamanhoSenhaInput.value < 97)) === 0) {
        mostrarMensagemDeAviso();
        return;
    }
    let senha = '';
    let tamanhoSenha = Number(tamanhoSenhaInput.value);
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
    mostrarSenha(senha, Number(tamanhoSenhaInput.value));  
    obj.array.length = 0;
    obj.x = 0;
});
function Limpar() {
    window.location.reload(true);
}
// Esta funcao e utilizada por gerarSenha .
function geradoraNumeroAleatorio(obj) {
    for (let i = 1; i < 301; i++) { // Loop controlado.
        obj.x = Math.round(Math.random() * 126);
        if (obj.array.includes(obj.x)) continue;
        if (obj.x > 31 && obj.x < 127) {
            obj.array.push(obj.x);
            break;
        }
    }

    return obj;
}
function mostrarSenha(senha, tamanho) {   
    input.disabled = false;
    input.style.fontSize = '1.5rem';
    input.style.fontWeight = '750';
    switch (true) { // Altera o tamanho do campo onde é inserido a senha .
        case tamanho > 7 && tamanho < 16: input.style.width = '13rem'; break;
        case tamanho > 15 && tamanho < 25: input.style.width = '20rem'; break;
        case tamanho > 15 && tamanho < 24: input.style.width = '25rem'; break;
        case tamanho > 24 && tamanho < 33: input.style.width = '34rem'; break;
        case tamanho > 32 && tamanho < 41: input.style.width = '39rem'; break;
        case tamanho > 40 && tamanho < 49: input.style.width = '49rem'; break;
        case tamanho > 48 && tamanho < 57: input.style.width = '54rem'; break;
        case tamanho > 56 && tamanho < 65: input.style.width = '64rem'; break;
        case tamanho > 64 && tamanho < 73: input.style.width = '66rem'; break;
        case tamanho > 72 && tamanho < 81: input.style.width = '68rem'; break;
        default: input.style.width = '70rem';
    }
    input.value = senha;
    input.disabled = true;
}
function mostrarMensagemDeAviso() {
    gerarSenha.disabled = true;
    const divSenhaImagem = document.getElementById('senha-imagem');
    divSenhaImagem.style.backgroundColor = '#40c0cb';
    divSenhaImagem.style.borderRadius = '1rem';
    imagemNumeroBinario.style.display = 'none';
    const textArea = document.createElement('textarea');
    textArea.textContent = '😟 o tamanho da senha deve ser entre 8 e 96.'.toUpperCase();
    textArea.classList.add('mensagem-aviso');
    divSenhaImagem.appendChild(textArea);
    setTimeout(() => {
        divSenhaImagem.removeChild(textArea);
        imagemNumeroBinario.style.display = null;
        gerarSenha.disabled = false;
    }, 3000);
}

