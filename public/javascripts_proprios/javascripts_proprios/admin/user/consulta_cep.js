const cep_input = document.querySelector('#Cep_input');


cep_input.addEventListener('blur', () => {
    const cep_formatado = cep_input.value.replace(/-/g, '');

    axios.get(`https://viacep.com.br/ws/${cep_formatado}/json/`)
        .then((result) => {
            document.querySelector('#Endereco_input').value = result.data.logradouro;
            document.querySelector('#Bairro_input').value = result.data.bairro;
        }).catch((err) => {
            console.log(err);
        });
})