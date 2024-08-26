const urlCasesAprovados = "https://sistemaemagrecendo.com/apiPedidos/valorPedidosAprovados";
let listaDosPedidosAprovados


document.addEventListener('DOMContentLoaded', () => {
    adquirirValores();

    setInterval(() => {
        cases();
    }, 300);
});

function adquirirValores(){
    fetch(urlCasesAprovados)
        .then(resp => resp.json())
        .then( data => {
            listaDosPedidosAprovados = data;
        })
        .catch( err => {
            console.log(err)
        })
}

function cases(){
    const caseValorAprovado = document.querySelector('#Case_De_Aprovados');
    const caseValorPago = document.querySelector('#Case_De_Ganhos');
    const caseValorDevendo = document.querySelector('#Case_De_Dividas');

    caseValorAprovado.innerHTML = `R$ ${listaDosPedidosAprovados[0]}`;
    caseValorDevendo.innerHTML = `R$ ${listaDosPedidosAprovados[2]}`;
    caseValorPago.innerHTML = `R$ ${listaDosPedidosAprovados[1]}`;
}