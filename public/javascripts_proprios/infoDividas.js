document.addEventListener('DOMContentLoaded', () => {
    let id_divida = document.querySelector('#id_divida');
    axios.get(`http://localhost:3030/apiDividas/consultarDivida/${id_divida.value}`)
        .then((result) => {
            console.log(result.data);
            console.log(result.data[0].tipo);

            // Preencher os campos do formulário com os dados recebidos
            let data = result.data[0];
            document.querySelector('#tipoDivida').value = data.tipo; // Tipo de dívida
            document.querySelector('#nomeDivida').value = data.nome; // Nome da dívida
            document.querySelector('#descricaoDivida').value = data.descricao; // Descrição da dívida
            document.querySelector('#valorDivida').value = data.valor; // Valor da dívida
            document.querySelector('#dataInicioDivida').value = new Date(data.data_inicio).toISOString().slice(0, 10); // Data de início
            // Verificar se há número de parcelas
            if (data.num_parcelas) {
                document.querySelector('#numParcelasDivida').value = data.num_parcelas; // Número de parcelas
            }

        }).catch((err) => {
            console.log(err);
        });
});