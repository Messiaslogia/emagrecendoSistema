const h2_Estoque = document.querySelector('#Total_Estoque');
const h2_ValorEmEstoque = document.querySelector('#Total_ValorEmEstoque');
const urlEstoqueGeral = "http://localhost:200/produtos/"

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${urlEstoqueGeral}/estoqueGeral`)
        .then( estoque => {
            h2_Estoque.innerHTML = `${estoque.data}`
        })
        .catch(err => {
            console.log(err)
        })

    // axios.get('/apiProdutos/valorTotalMateriais')
    //     .then( resp => {
    //         let valor = resp.data;
    //         let format = valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    //         h2_ValorEmEstoque.innerHTML = `R$ ${format}`
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
})