const h2_Estoque = document.querySelector('#Total_Estoque');
const h2_ValorEmEstoque = document.querySelector('#Total_ValorEmEstoque');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiProdutos/todoEstoque')
        .then( estoque => {
            h2_Estoque.innerHTML = `${estoque.data}`
        })
        .catch(err => {
            console.log(err)
        })

    axios.get('/apiProdutos/valorTotal')
        .then( resp => {
            h2_ValorEmEstoque.innerHTML = `R$${resp.data}`
        })
        .catch(err => {
            console.log(err)
        })
})