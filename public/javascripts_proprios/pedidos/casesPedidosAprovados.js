const urlCasesAprovados = "http://localhost:3030/apiPedidos/valorPedidosAprovados";
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

    caseValorAprovado.innerHTML = `R$ ${listaDosPedidosAprovados[0].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
    caseValorDevendo.innerHTML = `R$ ${listaDosPedidosAprovados[2].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
    caseValorPago.innerHTML = `R$ ${listaDosPedidosAprovados[1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
}