const h2_Estoque = document.querySelector('#Total_Estoque');
const h2_ValorEmEstoque = document.querySelector('#Total_ValorEmEstoque');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiProdutos/valorTotal')
        .then( resp => {
            let valor = resp.data;
            let format = valor;
            h2_ValorEmEstoque.innerHTML = `R$ ${format}`
        })
        .catch(err => {
            console.log(err)
        })
})