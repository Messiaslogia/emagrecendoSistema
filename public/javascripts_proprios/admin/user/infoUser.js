document.addEventListener('DOMContentLoaded', () => {
    let id = document.querySelector('#idUser').value;

    axios.get(`/api/userConsultEdit?idUser=${id}`)
        .then((result) => {
            let userData = result.data[0];

                document.querySelector('#Name_input').value = userData.nome || '';
                document.querySelector('#Email_input').value = userData.email || '';
                document.querySelector('#Password_input').value = userData.senha || '';
                document.querySelector('#Telefone_input').value = userData.telefone || '';
                document.querySelector('#CPF_input').value = userData.cpf || '';
                document.querySelector('#Instagram_input').value = userData.instagram || '';
                document.querySelector('#Facebooks_input').value = userData.facebook || '';
                document.querySelector('#Regiao_input').value = userData.regiao || '';
                document.querySelector('#Cep_input').value = userData.cep || '';
                document.querySelector('#Endereco_input').value = userData.endereco || '';
                document.querySelector('#Bairro_input').value = userData.bairro || '';
                document.querySelector('#Numero_input').value = userData.numero_endereco || '';
        }).catch((err) => {
            console.log(err);
        });
});