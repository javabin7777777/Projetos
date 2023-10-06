#Erros  
funcão validationPow:  Aceita caracter ponto e vírgula após e ou E.    
função validation:  Não aceita começar com sinal de + | não aceita 1e+1 ou 1e-1 (notação científica).    
~~um número não pode começar com zero,pois assim,seria um número octal.Exceção,quando existir ponto na segunda posição e não haver vírgulas.076.12 passa mas dar erro na função equalSign.fatorial de zero dar not a number.Alteração na funçãovalidation do arquivo validate.js ~~  
~~não faz fatorial de 0 e fatorial de 1.Alteração na função fatorial do arquivo utilities.js~~   
~~10,000,000*2 deu 'not number'| 1,000+1 deu not number,pois operação com número que tenha vírgula,todos operandos deverão ter vírgula ou ponto.~~    
~~1,000+1.0 resolvido. ~~    
1e0*1E0 deu not number,pois o caracter 'E' ficou no lugar do número 1,não foi adicionado a 'string'.    