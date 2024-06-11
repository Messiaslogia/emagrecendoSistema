document.addEventListener('DOMContentLoaded', () => {
    let id = document.querySelector('#idUser').value

    axios.get(`http://localhost:3030/api/userConsult/${id}`)
        .then((result) => {
                document.querySelector('#Name_input').value = result.data[0].nome;
                document.querySelector('#Email_input').value = result.data[0].email;
                document.querySelector('#Password_input').value = result.data[0].senha;
                document.querySelector('#Telefone_input').value = result.data[0].telefone;
                document.querySelector('#CPF_input').value = result.data[0].cpf;
                document.querySelector('#Instagram_input').value = result.data[0].instagram;
                document.querySelector('#Facebooks_input').value = result.data[0].facebook;
                document.querySelector('#Regiao_input').value = result.data[0].regiao;
                document.querySelector('#Cep_input').value = result.data[0].cep;
                document.querySelector('#Endereco_input').value = result.data[0].endereco;
                document.querySelector('#Bairro_input').value = result.data[0].bairro;
                document.querySelector('#Numero_input').value = result.data[0].numero_endereco;

        }).catch((err) => {
            console.log(err)
        });
})