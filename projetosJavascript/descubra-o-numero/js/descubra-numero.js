'use strict';
let mensagemAcerto = `\n\n\nVocê acertou em cheio !`;
let mensagemErrorMaior = `    \n\n\nVocê errou ! 
O número sorteado é maior .`;
let mensagemErrorMenor = `    \n\n\nVocê errou ! 
O número sorteado é menor .`;
let input = document.getElementById('entrada-input');
let select = document.getElementById('entrada-selecao-de-intervalo-select');
let resultado = document.getElementById('entrada-resultado-texto');
resultado.style.display = 'none';
let imagemBolinha = document.getElementById('entrada-resultado-imagemBolinhas');
let jogar = document.getElementById('botoes-jogar');
let limpar = document.getElementById('botoes-limpar');

limpar.addEventListener('click', () => Limpar());
select.addEventListener('change', () => {
    select.style.fontWeight = '900';
});
jogar.addEventListener('click', () => {  // Determinar se o jogador acertou ou não .
    if (Number(select.value == 0)) return;
    let numeroSorteado = Math.trunc((Math.random() * (Number(select.value))) + 1);  // Este é o número sorteado .
    if (Number(input.value) === numeroSorteado) {
        mostrarResultado(true, false, mensagemAcerto);
        return;
    }
    if (Number(input.value) > numeroSorteado) {
        mostrarResultado(false, false, mensagemErrorMenor);
    } else {
        mostrarResultado(false, true, mensagemErrorMaior);
    }
});

// Mostra o resultado do jogo .
function mostrarResultado(acertou, menorMaior, mensagem) {

    if (acertou) {
        imagemBolinha.style.display = null;
        resultado.style.display = 'none';
        imagemBolinha.src = imagemHit[Math.floor(Math.random() * imagemHit.length)];
        return;
    }

    if (menorMaior) {
        texto(mensagem,'#ff1233');
        imagem();
    } else {
        texto(mensagem,'#ffaade');
        imagem();        
    }
}

function imagem() {
    setTimeout(() => {
        imagemBolinha.style.display = null;
        resultado.style.display = 'none';
        imagemBolinha.src = imagemError[Math.floor(Math.random() * imagemError.length)];
    }, 1300);
}
function texto(mensagem,cor) {
    setTimeout(() => {
        resultado.style.display = null;
        imagemBolinha.style.display = 'none';        
        resultado.value = mensagem;
        resultado.style.backgroundColor = cor;
    }, 0);
}

function Limpar() {
    window.location.reload(true);
}

let imagemHit = ['./img/ganhou-1.gif', './img/ganhou-2.gif', './img/ganhou-3.gif', './img/ganhou-4.jpeg', './img/ganhou-5.jpeg'];
let imagemError = ['./img/perdeu-1.gif', './img/perdeu-2.gif', './img/perdeu-3.gif', './img/perdeu-4.gif', './img/perdeu-5.gif'];