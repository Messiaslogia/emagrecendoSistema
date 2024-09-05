const h2_Vendas = document.querySelector('#Total_Vendas');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiPagamentos/todasVendas')
        .then( resp => {
            h2_Vendas.innerHTML = `R$ ${resp.data}`
        })
        .catch(err => {
            console.log('Erro ao puxar vendas')
        })
})

