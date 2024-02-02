
const url = "http://localhost:3000/apiProdutos/todosProdutosForm";
const div_produtos = document.getElementById('Produto_input');
const div_valorProdutos = document.getElementById('Valor_Produto');
const div_valorDistribuidor = document.getElementById('Valor_Distribuidor');
const div_valorRevenda = document.getElementById('Valor_Revenda');




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
            div_valorProdutos.value = `R$ ${result.data[0].preco.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            div_valorDistribuidor.value = `R$ ${result.data[0].preco_distribuidor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            div_valorRevenda.value = `R$ ${result.data[0].preco_revenda.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`
        }).catch((err) =>{
            console.log(err)
        })
})