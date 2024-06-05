document.addEventListener('DOMContentLoaded', () =>{
    let id_produto = document.querySelector('#idDivida').value;

    axios.get(`http://localhost:3030/apiDividas/consultarDivida/${id_produto}`)
        .then((result) => {
            document.querySelector('#Nome_divida').value = result.data[0].nome;
            document.querySelector('#Descricao_Divida').value = result.data[0].descricao;
            document.querySelector('#Valor_divida').value = result.data[0].valor;
            document.querySelector('#Data_produto').value = result.data[0].data;
            document.querySelector('#Hora_produto').value = result.data[0].hora;

        }).catch((err) => {
            console.log(err);
        });
});
