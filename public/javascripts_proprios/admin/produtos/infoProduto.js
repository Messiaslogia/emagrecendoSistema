document.addEventListener('DOMContentLoaded', () => {
    let id_produto = document.querySelector('#idProduto').value;

    axios.get(`http://localhost:3030/apiProdutos/consultProduto/${id_produto}`)
        .then((result) => {
            let produto = result.data[0];
            document.querySelector('#Nome_produto').value = produto.nome;
            document.querySelector('#Descricao_produto').value = produto.descricao;
            document.querySelector('#Quantidade_produto').value = produto.quantidade;
            document.querySelector("#Preco_produto").value = `R$ ${produto.preco}`;
            document.querySelector("#Preco_produto_Distribuidor").value = `R$ ${produto.preco_distribuidor}`;
            document.querySelector("#Preco_produto_Representante").value = `R$ ${produto.preco_revenda}`;
            document.querySelector("#Preco_produto_Vendedor").value = `R$ ${produto.preco_vendedor}`;
            document.querySelector("#preco_custo").value = `R$ ${produto.preco_custo}`;
            document.querySelector("#categoriaProdutos").value = produto.categoria;

            if (produto.imagem) {
                document.querySelector('#currentImage').src = '/' + produto.imagem;
                document.querySelector('#currentImage').style.display = 'block';
                document.querySelector('#imagemAtual').value = produto.imagem;
            }

        }).catch((err) => {
            console.log(err);
        });
});
