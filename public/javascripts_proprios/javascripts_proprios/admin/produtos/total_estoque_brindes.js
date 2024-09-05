const h2_Estoque = document.querySelector('#Total_Estoque');
const h2_ValorEmEstoque = document.querySelector('#Total_ValorEmEstoque');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiProdutos/todoEstoqueBrindes')
        .then( estoque => {
            h2_Estoque.innerHTML = `${estoque.data}`
        })
        .catch(err => {
            console.log(err)
        })

    axios.get('/apiProdutos/valorTotalBrindes')
        .then( resp => {
            let valor = resp.data;
            h2_ValorEmEstoque.innerHTML = `R$ ${valor}`
        })
        .catch(err => {
            console.log(err)
        })
})