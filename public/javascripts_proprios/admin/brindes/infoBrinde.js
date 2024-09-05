const url = 'https://apiemagrecendo.com/brindes/'

document.addEventListener('DOMContentLoaded', () => {
    const id_brinde = document.querySelector('#idProduto').value;

    axios.get(`${url}consultarBrinde/${id_brinde}`)
        .then((result) => {
            document.querySelector('#Nome_produto').value = result.data[0].nome
            document.querySelector('#Descricao_produto').value = result.data[0].descricao
            document.querySelector('#Quantidade_produto').value = result.data[0].quantidade
            document.querySelector('#Preco_produto').value = `R$ ${result.data[0].preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            if (result.data[0].img) {
                document.querySelector('#currentImage').src = '/' + result.data[0].img;
                document.querySelector('#currentImage').style.display = 'block';
                document.querySelector('#imagemAtual').value = result.data[0].img;
            }
        })
})