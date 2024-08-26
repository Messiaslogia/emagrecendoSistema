const urlProdutos = "/apiProdutos/todosProdutosForm";
const div_produtos = document.getElementById('Produto_input');
const div_valorDistribuidor = document.getElementById('Valor_Produto');
const div_valorRevenda = document.getElementById('Valor_Revenda');


document.addEventListener('DOMContentLoaded', () => {
    listaNomesProdutos();
});

function listaNomesProdutos(){
    axios.get(urlProdutos)
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
    axios.get(`https://sistemaemagrecendo.com/apiProdutos/consultProduto/${valor}`)
        .then((result) => {
            div_valorDistribuidor.value = `R$ ${result.data[0].preco_revenda.toFixed(2)}`;
        }).catch((err) =>{
            console.log(err)
        })
})