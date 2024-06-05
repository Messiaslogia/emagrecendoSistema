const urlCases = "http://localhost:3030/apiPedidos/casesEntregas"



document.addEventListener('DOMContentLoaded', () => {
    let divNãoEntregues = document.querySelector('#Total_Nao_Entregues');
    let divEntregues = document.querySelector('#Total_Entregues');
    let divACaminho = document.querySelector('#Total_Em_Analise');

    axios.get(`${urlCases}`)
        .then(resp => {
            divEntregues.innerHTML = resp.data[1];
            divNãoEntregues.innerHTML = resp.data[2];
            divACaminho.innerHTML = resp.data[0];
        })
        .catch(err => {
            console.log(err)
        })
})