Erros  
funcão validationPow:  Aceita caracter ponto e vírgula após e ou E.  
função validation:  Não aceita começar com sinal de + | não aceita 1e+1 ou 1e-1 (notação científica).  
~~ um número não pode começar com zero,pois assim,seria um número octal.Exceção,quando existir ponto na segunda posição e não haver vírgulas.076.12 passa mas dar erro na função equalSign.fatorial de zero dar not a number.Alteração na função validatuion do arquivo validate.js ~~
~~não faz fatorial de 0 e fatorial de 1.Alteração na função fatorial do arquivo utilities.js~~  
10,000,000*2 deu 'not number'| 1,000+1 deu not number,pois operação com número que tenha vírgula,
todos operandos deverão ter vírgula ou ponto.  
~~1,000+1.0 resolvido. ~~ 
1e0*1E0 deu not number,pois o caracter 'E' ficou no lugar do número 1,não foi adicionado a 'string'.   
A potência de 2 resulta em not number para input vazio.   
Ao colocar somente o caracter ',' resulta em:Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')
    at equalSign (equal.js:95:38)
    at HTMLButtonElement.<anonymous> (utilities.js:235:70)   
Ao colocar somente o caracter '-' resulta em:VM287:1 Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:95:34)
    at HTMLButtonElement.<anonymous> (utilities.js:235:70)
equalSign @ equal.js:95
(anonymous) @ utilities.js:235  
Ao colocar somente o caracter '+' resulta em:VM287:1 Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:95:34)
    at HTMLButtonElement.<anonymous> (utilities.js:235:70)
equalSign @ equal.js:95
(anonymous) @ utilities.js:235      