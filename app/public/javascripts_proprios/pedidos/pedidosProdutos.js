
const url = "http://localhost:3000/apiProdutos/todosProdutosForm";
const div_produtos = document.getElementById('Produto_input')
const div_valorProdutos = document.getElementById('Valor_Produto')



document.addEventListener('DOMContentLoaded', () => {
    listaNomesProdutos();
});



function listaNomesProdutos(){
    axios.get(url)
        .then( resp => {
            resp.data.forEach( produto => {
                div_produtos.innerHTML += `
                <option value="${produto.id_produto}">${produto.nome}</option>
                `
            })
        })
        .catch( err => {
            console.log(err)
        })
}

div_produtos.addEventListener('change', function () {
    var valor = div_produtos.value
    axios.get(`http://localhost:3000/apiProdutos/consultProduto/${valor}`)
        .then((result) => {
            div_valorProdutos.value = result.data[0].preco
        }).catch((err) =>{
            console.log(err)
        })
})