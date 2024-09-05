document.addEventListener('DOMContentLoaded', () => {
    let id_produto = document.querySelector('#idProduto').value;
    
    axios.get(`https://sistemaemagrecendo.com/apiProdutos/consultProduto/${id_produto}`)
        .then((result) => {
            let nome_produto = document.querySelector('#Nome_produto').value = result.data[0].nome;
            let descricao_produto = document.querySelector('#Descricao_produto').value = result.data[0].descricao;
            let quantidade_produto = document.querySelector('#Quantidade_produto').value = result.data[0].quantidade;
            let data_produto = document.querySelector('#Data_produto').value = result.data[0].data_adicao;
            let hora_produto = document.querySelector('#Hora_produto').value = result.data[0].hora_adicao;

            let valor = result.data[0].preco.toFixed(2);
            let valorDistribuidor = result.data[0].preco_distribuidor.toFixed(2);
            let valorVendedor = result.data[0].preco_revenda.toFixed(2);

            let format = valor.replace('.', ',');
            let formatDistribuidor = valorDistribuidor.replace('.', ',');
            let formatVendedor = valorVendedor.replace('.', ',');


            let preco_produto = document.querySelector('#Preco_produto').value = `R$ ${format}`;
            let preco_produto_Distribuidor = document.querySelector('#Preco_produto_Distribuidor').value = `R$ ${formatDistribuidor}`;
            let preco_produto_Revenda = document.querySelector('#Preco_produto_Revenda').value = `R$ ${formatVendedor}`;  

        }).catch((err) => {
            console.log(err);
        });
});