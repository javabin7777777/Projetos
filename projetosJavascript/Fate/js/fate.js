    // array of possible answers .
const answer=["sim.","não.","provávelmente.","pode ser.","Certeza!",
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
"Sinais apontam que sim.","Passa amanhã.","É bom não saber.","Está tudo bem,vai em frente.","Viva La Vida.","Numa boa.","Tô correndo"
];

const elementH3=document.querySelector("#answer");
const input=document.querySelector("#input");
const elementDiv=document.querySelector("#chronometer");
const h1=document.querySelector("h1");

h1.innerText = h1.innerText.toUpperCase();

function ask()  {   // Button Question.
    elementH3.style.opacity = 1;
    if(input.value == ""){
        window.alert("Type something in the question field");
        return;
    }
    chronometer();
    setTimeout(()=> { // Insert the answer and enable the button and input .
        elementDiv.innerText="";
        elementH3.innerHTML = "<div>"+input.value+"</div>" + answer[Math.floor(Math.random()*answer.length)];
        input.value="";
        setTimeout(()=> elementH3.style.opacity = 0,5000); // Set opacity of the <h3> element(Response).
        setTimeout(()=> {
            input.removeAttribute("disabled");
            button.removeAttribute("disabled");
            elementH3.innerHTML="" ;
        },8000);

    },7000);
}

// The elapsed time to get the answer.Disable the button and input.
function chronometer()  {
    input.setAttribute("disabled",true);
    button.setAttribute("disabled",true);
    let tempo=5;
    elementDiv.style.opacity=1;
    let id=setInterval(()=> {
        elementDiv.innerText=tempo;
        tempo-=1;
        if(tempo==0){
            clearInterval(id);
            elementDiv.style.opacity=0;
        }
    },1000)
}