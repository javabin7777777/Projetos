***  
Número de Euler,PI, e outras constantes,não é possível executar operações como soma,raiz,multiplicação ...
### Funcão validationPow  
Aceita caracter ' ; ' após ' e ou E '. 
~~um número não pode começar com zero,pois assim,seria um nmero octal.Exceção,quando existir ponto na segunda posição e não haver vírgulas.076.12 passa mas dar erro na função equalSign.fatorial de zero dar not a number.Alteração na função validatuion do arquivo validate.js~~
~~não faz fatorial de 0 e fatorial de 1.Alteração na função fatorial do arquivo utilities.js~~  
~~10,000,000*2 deu 'not number'| 1,000+1 deu not number.~~  
~~ 1,000+1.0  operação normal.~~    
*1e0*1E0 deu not number,pois o caracter 'E' ficou no lugar do número 1,não foi adicionado a 'string'. *    
~~A potência de 2 resulta em not number para input vazio.~~   
~~x² resulta em não é número quando entrada é 1,000.~~    
~~Ao colocar somente o caracter ',' resulta em:Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')   at equalSign (equal.js:95:38)  at HTMLButtonElement.<anonymous> (utilities.js:235:70)~~  

### Função validation 
fatorial de 99 = 9.332621544394415e+155,que ao fazer fatorial,resultou 'NÃO É POSSÍVEL',e deveria ser 'SOBRECARGA'.
Não aceita começar com sinal de + | não aceita ' 1e+1 ou 1e-1 ' (notação científica).   
Ao colocar somente o caracter '-' resulta em: 
VM422:1  Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)  

Ao colocar somente o caracter '+' resulta em: Uncaught SyntaxError: Unexpected end of input
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70) 

Ao colocar somente o caracter '*' resulta em : Uncaught SyntaxError: Unexpected token '*'
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)  

Ao colocar somente o caracter  '/' resulta em : Uncaught SyntaxError: Invalid regular expression: missing /
    at equalSign (equal.js:109:34)
    at HTMLButtonElement.<anonymous> (utilities.js:265:70)

~~revisar função validate pois invalida as operações em geral.~~   

~~0-1,0.0 +1,0*1 resulta not a number ver -> funcao validation(-> validate.js)~~   

~~402 não passa na funcao octal,pode ser resolvido em uma das validaçoes da função validation(validate.js)~~

~~0.0 resulta não é numero~~    
~~200*0.1 resulta não é numero~~    

~~0.2-003 provoca erros na funcao equal em eval(str),**** octal ****. Verificar função validation(-> validate.js)~~  

~~percentagem resulta em not a number.~~  
~~ Resolver a questão da divisão por zero. ~~  
***  

