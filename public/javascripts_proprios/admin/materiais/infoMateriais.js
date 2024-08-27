const url = 'https://apiemagrecendo.com/materiais/'

document.addEventListener('DOMContentLoaded', () => {
    const id_materiais = document.querySelector('#idProduto').value;

    axios.get(`${url}consultarMaterial/${id_materiais}`)
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