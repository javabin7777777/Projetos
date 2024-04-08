funcão validationPow:  Aceita caracter ' ponto e vírgula ' após ' e ou E '.    
função validation:  ~~ Não aceita começar com sinal de + ~~ | não aceita ' 1e+1 ou 1e-1 ' (notação científica).  
~~um número não pode começar com zero,pois assim,seria um número octal.Exceção,quando existir ponto na segunda posição e não ~~ ~~haver vírgulas.076.12 passa mas dar erro na função equalSign.fatorial de zero dar not a number.Alteração na função validatuion do arquivo validate.js ~~
~~não faz fatorial de 0 e fatorial de 1.Alteração na função fatorial do arquivo utilities.js~~  
~~ 10,000,000*2 deu 'not number'| 1,000+1 deu not number. ~~  
~~ 1,000+1.0  operação normal.~~    
1e0*1E0 deu not number,pois o caracter 'E' ficou no lugar do número 1,não foi adicionado a 'string'.     
~~ A potência de 2 resulta em not number para input vazio. ~~   
~~ x² resulta em não é número quando entrada é 1,000.~~    
~~ Ao colocar somente o caracter ',' resulta em:Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')   at equalSign (equal.js:95:38)  at HTMLButtonElement.<anonymous> (utilities.js:235:70) ~~  

Ao colocar somente o caracter '-' resulta em: 
VM422:1  Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)  

Ao colocar somente o caracter '+' resulta em: Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70) 

Ao colocar caracter '*' resulta em : Uncaught SyntaxError: Unexpected token '*'
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)  

Ao colocar caracter  '/' resulta em : Uncaught SyntaxError: Invalid regular expression: missing /
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)  

~~revisar função validate pois invalida as operações em geral.~~  
~~0-1,0.0 +1,0*1 resulta not a number ver -> funcao validate ~~  
0.2-003 provoca erros na funcao equal em eval(str),**** octal ****
~~ percentagem resulta em not a number.~~  
