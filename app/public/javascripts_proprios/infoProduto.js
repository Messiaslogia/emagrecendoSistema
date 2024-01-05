document.addEventListener('DOMContentLoaded', () => {
    let id_produto = document.querySelector('#idProduto').value;

    axios.get(`http://localhost:3000/apiProdutos/consultProduto/${id_produto}`)
        .then((result) => {
            document.querySelector('#Nome_produto').value = result.data[0].nome;
            document.querySelector('#Descricao_produto').value = result.data[0].descricao;
            document.querySelector('#Quantidade_produto').value = result.data[0].quantidade;
            document.querySelector('#Preco_produto').value = result.data[0].preco;
        }).catch((err) => {
            console.log(err);
        });
});