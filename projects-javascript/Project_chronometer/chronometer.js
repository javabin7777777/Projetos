
/* definição e inicialização das variáveis */

var control=false; // 'default value'
var aux=0;
var time=0;
const text1="Zero is not valid!"; 
const text2="Not a number!";
const num = document.querySelector("#input");
const buttonstart= document.querySelector("#buttonStart");
const buttonPlus = document.querySelector("#buttonPlus");
const buttonMinus = document.querySelector("#buttonMinus");
const reset = document.querySelector("#reset");
num.value="";
function chronometer(){ // A função chronometer que é chamada ao pressionar o botão 'Start' .   
    buttonstart.setAttribute("disabled",true);//trava no botão start,que é liberado na função Time() .
    let number = ['0','1','2','3','4','5','6','7','8','9','-']; // caracteres aceitos na entrada .      
    let array=[];                  
    array=(num.value).split(""); // correponde o valor de entrada (array de string) . 
        //console.log(array);
    if ( valuation(array,number) ){ //validação do valor de entrada .
        aux=0; // zerado para uma nova contagem .              
        time=Math.abs(parseInt(num.value));
        let T = time*1000;// usado para liberar os botões .        
        if (time != 0){
            lock();// trava os botões '+','-','R' conforme contagem progressiva,ou exclusivo,regressiva .
            Time(T);// faz a contagem
        }else num.value=text1;    
        
    }else num.value=text2;
       
}

/* funções utilizadas */

//Defini contagem progressiva .
function plus(){  
    control=true;
    // caso o campo texto de entrada esteja vazio insere a mensagem text2 neste campo .
    if(num.value == "") num.value = text2;
    // insere o valor de aux,para o caso de uma contagem progressiva após a contagem regressiva .
    if(num.value == 0) num.value = aux;
   
}

//Defini contagem regressiva,que é a 'default' .
function minus() { 
    control=false;    
    if(num.value == "") num.value = text2;    
    if(num.value == 0) num.value = aux;//insere o valor novamente para repetir a contagem .
}

//Validar a entrada .
function valuation(array,number) {
    if( array.length != 0 ){        
    //verificar se a entrada é um número .
        for (let i=0;i<array.length;i++){            
        //verificar se o sinal de menos '-' é único e se é o primeiro caracter do valor entrado .                   
            if(array.indexOf(array[i],i) != 0 && array[i] == '-') return false;
        //verificar os outros caracteres de entrada,que só podem ser números .
            if( !number.includes(array[i]) ) return false;
        }

    }else return false; //se não passar na validação .

    return true; //se passar na validação .
}

//Faz a contagem 
function Time(T) {
    
    // destrava todos botões após o tempo decorrido .
    setTimeout(function(){ 
            buttonstart.removeAttribute("disabled");
            buttonMinus.removeAttribute("disabled");
            buttonPlus.removeAttribute("disabled");
            reset.removeAttribute("disabled");
            },T);

     //executa a contagem do tempo .
    let id=setInterval(function(){                          
        //console.log('time '+time);
            if (control){ //contagem progressiva .                                          
                ++aux;
                num.value=aux;                                  
                if( aux == time) {                
                    clearInterval(id);
                }
            }else { //contagem regressiva .
                --time;
                num.value = time;
                if(time == 0) { 
                    clearInterval(id);                   
                }             
            }
    },1000);

    
}

//desabilitar os botões '+' e '-' conforme seja contagem progressiva,ou exclusivo,regressiva .
function lock() {    
    if(control){ //desabilita o botão '-' e o 'R' para contagem progressiva
        buttonMinus.setAttribute("disabled",true); 
        reset.setAttribute("disabled",true);
        num.value=0;//insere o valor zero para contagem progressiva .
    }
    else{ //desabilita o botão '+' e o 'R' para contagem regressiva .
        buttonPlus.setAttribute("disabled",true);
        reset.setAttribute("disabled",true);
        aux=num.value; 
        //guarda o valor de  entrada em 'aux' para repetir a contagem regressiva como o 
        //mesmo valor ou uma contagem progressiva . 
    }
}