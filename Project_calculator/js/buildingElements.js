
export function buildElements(div) {

    // Criar os 'buttons' de '0 a 9'
    for (let i = 0; i < 10; i++) {
        div.innerHTML = div.innerHTML + `<button class="number">${i}</button>`;
    }

    // Criar os 'buttons' +,-,*,/,$,%,x²,pow,sqrt,root,Ln,Log,e,PI,sin,cos,tan,+-,E,(),.,',',CL,DEL,MR,LO,R,= .
    let divNumber = div.innerHTML;
    let X1 = `<button class="operator1">+</button><button class="operator1">-</button><button class="operator1">*</button><button class="operator1">/</button>`;

    let X2 = `<button id="real">R$</button><button id="percentage">%</button><button id="pow2")">x²</button><button id="inverse" >1/x</button><button onclick="generic(\'abs\')">|x|</button>`;

    let X3 = `<button id="fatorial">n!</button><button onclick="generic(\'mod\')">mod</button><button id="pow">x<sup>y</sup></button><button id='squareRoot' title="Square Root"><img src="img/square-root-50.png" alt="square root icon "></button><button  id="root" title="Root"><img src="img/square-root-50-N.png" alt="generic root icon "></button><button id='ln' title='Neperian logarithm' onclick="generic(\'ln\')">ln</button><button id='log' title='Decimal logarithm' onclick="generic(\'log\')">log</button>`;

    let X4 = `<button id="euler" title="Euler Number">e</button><button id="pi">PI</button><button id="sen">sin</button><button id="cos">cos</button>`;

    let X5 = `<button id="tan">tan</button><button id="sign" >+-</button><button id="signE" title="Scientific Notation">E</button><button id="parenthesis">( )</button>`;

    let X6 = `<button class="operator1">.</button><button class="operator1">,</button><button  id="clear" title="Clear">CL</button><button  id="del">DEL</button>`;

    let X7 = `<button id="memory" title="Memory Read">MR</button><button id="lastOper" title="Last Operation">LO</button><button  onclick="window.location.reload()" title="Reset">R</button><button id="equal">=</button>`;

    let X8 = `<button id="clearText" title="Clear Text">Ctt</button>`;
    
    div.innerHTML = `${divNumber}${X1}${X2}${X3}${X4}${X5}${X6}${X8}${X7}`;
}
