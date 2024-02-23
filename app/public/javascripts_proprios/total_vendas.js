const h2_Vendas = document.querySelector('#Total_Vendas');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiPagamentos/todasVendas')
        .then( resp => {
            h2_Vendas.innerHTML = `R$ ${resp.data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`
        })
        .catch(err => {
            console.log('Erro ao puxar vendas')
        })
})

