const urlCases = "http://localhost:3000/apiPedidos/casesEntregas"
const entregasUrl = "http://localhost:3000/apiPedidos/entregas"



document.addEventListener('DOMContentLoaded', () => {
    let divNãoEntregues = document.querySelector('#Total_Nao_Entregues');
    let divEntregues = document.querySelector('#Total_Entregues');
    let divACaminho = document.querySelector('#Total_Em_Analise');

    axios.get(`${urlCases}`)
        .then(resp => {
            
            divNãoEntregues.innerHTML = resp.data[2];
            divACaminho.innerHTML = resp.data[0];
        })
        .catch(err => {
            console.log(err)
        })

    axios.get(`${entregasUrl}`)
        .then(resp => {
            console.log(resp.data)

            const data = resp.data
            divEntregues.innerHTML = `${data.totalEntrega}`;
            
        })
        .catch(err => {
            console.log(err)
        })
})