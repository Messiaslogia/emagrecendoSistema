const urlUsuarios = "http://localhost:3030/api/todosUsuariosPedido";
const inputFuncao = document.querySelector('#Funcao_input');
const inputUsuario = document.getElementById('Usuario_input');

function alerta(){
    alert('Selecione uma função antes!!')
}

inputUsuario.addEventListener('click', alerta)
inputFuncao.addEventListener('input', () => {
    inputUsuario.removeEventListener('click', alerta);
    adquirirListsUsers();
});

function adquirirListsUsers() {
    const inputValue = inputFuncao.value;

    axios.post(urlUsuarios, {
        funcaoValue: inputValue
    })
        .then(resp => {
            // Use diretamente os dados da resposta sem chamar resp.json()
            resp.data.forEach(user => {
                inputUsuario.innerHTML += `
                    <option registro="${user.funcao}" value="${user.id_usuario}">${user.nome}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}