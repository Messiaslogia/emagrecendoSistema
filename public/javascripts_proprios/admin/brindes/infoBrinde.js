const url = 'http://localhost:200/brindes/'

document.addEventListener('DOMContentLoaded', () => {
    const id_brinde = document.querySelector('#idProduto').value;

    axios.get(`${url}consultarBrinde/${id_brinde}`)
        .then((result) => {
            document.querySelector('#Nome_produto').value = result.data[0].nome
            document.querySelector('#Descricao_produto').value = result.data[0].descricao
            document.querySelector('#Quantidade_produto').value = result.data[0].quantidade
            document.querySelector('#Preco_produto').value = result.data[0].preco;

            if (result.data[0].img) {
                document.querySelector('#currentImage').src = '/' + result.data[0].img;
                document.querySelector('#currentImage').style.display = 'block';
                document.querySelector('#imagemAtual').value = result.data[0].img;
            }
        }).catch((err) => {
            
        });
})