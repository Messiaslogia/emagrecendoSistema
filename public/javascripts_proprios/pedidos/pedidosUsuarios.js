
const urlUsuarios = "http://localhost:200/users/allUsersPedidosAdmin";
const inputFuncao = document.getElementById('Funcao_input');
const div_produto = document.getElementById('Produto_input');
const div_valorProduto = document.getElementById('Valor_Produto');
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
        funcao: inputValue
    })
        .then(resp => {
            inputUsuario.innerHTML = ''
            inputUsuario.innerHTML += `<option >Selecione um usuário</option>`
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

