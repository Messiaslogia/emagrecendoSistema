document.addEventListener('DOMContentLoaded', () => {
    const id_divida = document.querySelector('#idDivida');
    axios.get(`https://apiemagrecendo.com/dividas/consultarDividaOutrosUsuarios?id=${id_divida.value}`)
        .then((result) => {

            // Preencher os campos do formulário com os dados recebidos
            const data = result.data[0];
            document.querySelector('#Nome_divida').value = data.nome; // Tipo de dívida
            document.querySelector('#Descricao_Divida').value = data.descricao; // Descrição da dívida
            document.querySelector('#Valor_divida').value = data.valor; // Valor da dívida
            document.querySelector('#Data_produto').value = data.data; // Data de início
        }).catch((err) => {
            console.log(err);
        });
});