document.addEventListener('DOMContentLoaded', () => {
    let id_produto = document.querySelector('#idProduto').value;
    
    axios.get(`http://localhost:3030/apiProdutos/consultProduto/${id_produto}`)
        .then((result) => {
            let nome_produto = document.querySelector('#Nome_produto').value = result.data[0].nome;
            let descricao_produto = document.querySelector('#Descricao_produto').value = result.data[0].descricao;
            let quantidade_produto = document.querySelector('#Quantidade_produto').value = result.data[0].quantidade;
            let preco = document.querySelector("#Preco_produto").value = result.data[0].preco;
            let preco_distribuidor = document.querySelector("#Preco_produto_Distribuidor").value = result.data[0].preco_distribuidor;
            let preco_revenda = document.querySelector("#Preco_produto_Representante").value = result.data[0].preco_revenda;
            let preco_vendedor = document.querySelector("#Preco_produto_Vendedor").value = result.data[0].preco_vendedor;
            let preco_custo = document.querySelector("#preco_custo").value = result.data[0].preco_custo;
            let imagem = document.querySelector("#Imagem_produto").value = result.data[0].imagem;
            let categoria = document.querySelector("#categoriaProdutos").value = result.data[0].categoria; 

        }).catch((err) => {
            console.log(err);
        });
});