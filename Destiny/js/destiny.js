const respostas=["sim.","não.","provávelmente.","pode ser.","Certeza!",
"Não tenho tanta certeza.",
"É decididamente assim.",
"Não conte com isso.",
"Sem dúvidas!",
"Pergunte novamente mais tarde.",
"Sim, definitivamente!",
"Minha resposta é não.",
"Você pode contar com isso.",
"Melhor não te dizer agora.",
"A meu ver, sim.",
"Minhas fontes dizem não.",
"Provavelmente.",
"Não é possível prever agora.",
"Perspectiva boa.",
"As perspectivas não são tão boas.",
"Sim.","A vida é um caminho,faça disso uma aventura.",
"Concentre-se e pergunte novamente.",
"Sinais apontam que sim.","Passa manhã.","É bom não saber.","Está tudo bem,vai em frente.","Viva La Vida."];
   // array com as respostas possíveis
const elementH3=document.querySelector("#answer"); 
const campoTexto=document.querySelector("#input");
const elementDiv=document.querySelector("#chronometer");
const h1=document.querySelector("h1");

h1.innerText = h1.innerText.toUpperCase();

function ask(){   // button "Question" .           
    elementH3.style.opacity = 1;
    if(campoTexto.value == ""){  
        window.alert("Type something in the question field");
        return;
    }
    if(campoTexto !=""){
        chronometer();
        setTimeout(function(){ // insert the answer and disable the buttons .                   
            elementH3.innerHTML = "<div>"+campoTexto.value+"</div>" + respostas[Math.floor(Math.random()*respostas.length)];
            campoTexto.value="";
           // campoTexto.setAttribute("disabled",true);
           // button.setAttribute("disabled",true);          
            setTimeout(function(){ //  set opacity of the <h3> element .
                elementH3.style.opacity = 0;              
            },5000)
            setInterval(function(){ // enables the buttons .
                campoTexto.removeAttribute("disabled"); 
                button.removeAttribute("disabled");
                elementH3.innerHTML="" 
            },8000)
            elementDiv.innerHTML="";
        },7000)            
    } 
}

// elapsed time to get the answer .
function chronometer(){ 
    campoTexto.setAttribute("disabled",true);
    button.setAttribute("disabled",true);  
    let tempo=5;
    elementDiv.style.opacity=1;
    let id=setInterval(function(){         
        elementDiv.innerHTML = tempo;
        --tempo;
        if(tempo==0){
            clearInterval(id);
            elementDiv.style.opacity=0;
        }
    },1000)    
}

